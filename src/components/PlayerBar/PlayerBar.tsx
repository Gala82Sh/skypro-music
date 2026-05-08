'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/store';
import {
  setIsPlaying,
  setCurrentTrack,
  toggleRepeat,
  toggleShuffle,
  toggleLike,
  setLikedTracks
} from '@/store/features/trackSlice';
import { tracks } from '@/data/tracks';
import styles from './PlayerBar.module.css';

export default function PlayerBar() {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, isRepeat, isShuffle, likedTracks } = useAppSelector((state) => state.tracks);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [audioError, setAudioError] = useState(false);

  const isLiked = currentTrack ? likedTracks.includes(currentTrack.id) : false;

  const isFirstTrack = () => {
    if (!currentTrack) return true;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    return currentIndex === 0;
  };

  const isLastTrack = () => {
    if (!currentTrack) return true;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    return currentIndex === tracks.length - 1;
  };

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedTracks');
    if (savedLikes) {
      dispatch(setLikedTracks(JSON.parse(savedLikes)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
  }, [likedTracks]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const getRandomTrack = () => {
    if (!currentTrack) return tracks[0];
    const otherTracks = tracks.filter(t => t.id !== currentTrack.id);
    const randomIndex = Math.floor(Math.random() * otherTracks.length);
    return otherTracks[randomIndex];
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    if (isLastTrack()) return;

    if (isShuffle) {
      const randomTrack = getRandomTrack();
      dispatch(setCurrentTrack(randomTrack));
      dispatch(setIsPlaying(true));
    } else {
      const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
      if (currentIndex === -1) return;
      dispatch(setCurrentTrack(tracks[currentIndex + 1]));
      dispatch(setIsPlaying(true));
    }
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    if (isFirstTrack()) return;

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex === -1) return;
    dispatch(setCurrentTrack(tracks[currentIndex - 1]));
    dispatch(setIsPlaying(true));
  };

  useEffect(() => {
  if (currentTrack && audioRef.current) {
    audioRef.current.src = currentTrack.track_file;
    audioRef.current.play().catch((e) => {
      if (e.name !== 'AbortError') {
        console.warn('Play error:', e);
      }
    });
    dispatch(setIsPlaying(true));
  }
}, [currentTrack, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleAudioError = () => {
    setAudioError(true);
    setTimeout(() => setAudioError(false), 3000);
  };

  const handleAudioLoadStart = () => {
    setAudioError(false);
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    } else {
      nextTrack();
    }
  };

  if (!currentTrack) {
    return (
      <div className={styles.bar}>
        <div className={styles.bar__content}>
          <div className={styles.bar__playerProgress}></div>
          <div className={styles.bar__playerBlock}>
            <div className={styles.bar__player}>
              <div className={styles.player__controls}>
                <div className={styles.player__btnPrev}>
                  <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </div>
                <div className={styles.player__btnPlay}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
                <div className={styles.player__btnNext}>
                  <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </div>
                <div className={styles.player__btnRepeat}>
                  <svg className={styles.player__btnRepeatSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </div>
                <div className={styles.player__btnShuffle}>
                  <svg className={styles.player__btnShuffleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                  </svg>
                </div>
              </div>

              <div className={styles.player__trackPlay}>
                <div className={styles.trackPlay__contain}>
                  <div className={styles.trackPlay__image}>
                    <svg className={styles.trackPlay__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </div>
                  <div className={styles.trackPlay__album}>
                    <span className={styles.trackPlay__albumLink}>Выберите трек</span>
                  </div>
                  <div className={styles.trackPlay__author}>
                    <span className={styles.trackPlay__authorLink}>Не выбрано</span>
                  </div>
                </div>

                <div className={styles.trackPlay__likeDis}>
                  <div className={styles.trackPlay__like}>
                    <svg className={styles.trackPlay__likeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                    </svg>
                  </div>
                  <div className={styles.trackPlay__dislike}>
                    <svg className={styles.trackPlay__dislikeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bar__volumeBlock}>
              <div className={styles.volume__content}>
                <div className={styles.volume__image}>
                  <svg className={styles.volume__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                  </svg>
                </div>
                <div className={styles.volume__progress}>
                  <input
                    className={styles.volume__progressLine}
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        {audioError && (
          <div className={styles.errorToast}>
            ⚠️ Ошибка загрузки трека. Проверьте файл или путь.
          </div>
        )}

        <div className={styles.bar__playerProgress}></div>

        <div className={styles.bar__progressWrapper}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className={styles.progressLine}
            style={{ '--progress-percent': `${progressPercent}%` } as React.CSSProperties}
          />
          <div className={styles.timeInfo}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={`${styles.player__btnPrev} ${isFirstTrack() ? styles.disabled : ''}`}
                onClick={!isFirstTrack() ? prevTrack : undefined}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              <div className={styles.player__btnPlay} onClick={() => dispatch(setIsPlaying(!isPlaying))}>
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}></use>
                </svg>
              </div>

              <div
                className={`${styles.player__btnNext} ${isLastTrack() ? styles.disabled : ''}`}
                onClick={!isLastTrack() ? nextTrack : undefined}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                className={`${styles.player__btnRepeat} ${isRepeat ? styles.active : ''}`}
                onClick={() => dispatch(toggleRepeat())}
                style={{ cursor: 'pointer' }}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                className={`${styles.player__btnShuffle} ${isShuffle ? styles.active : ''}`}
                onClick={() => dispatch(toggleShuffle())}
                style={{ cursor: 'pointer' }}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link href="/artist/1" className={styles.trackPlay__authorLink}>{currentTrack.title}</Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link href="/album/1" className={styles.trackPlay__albumLink}>{currentTrack.author}</Link>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div
                  className={`${styles.trackPlay__like} ${isLiked ? styles.active : ''}`}
                  onClick={() => dispatch(toggleLike(currentTrack.id))}
                  style={{ cursor: 'pointer' }}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__dislike}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={styles.volume__progress}>
                <input
                  className={styles.volume__progressLine}
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onError={handleAudioError}
        onLoadStart={handleAudioLoadStart}
      />
    </div>
  );
}