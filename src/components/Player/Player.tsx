'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { setIsPlaying, setCurrentTrack } from '@/store/features/trackSlice';
import { tracks } from '@/data/tracks';
import styles from './Player.module.css'; 


export default function Player() {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.tracks);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentIndex = tracks.findIndex((track) => track.id === currentTrack?.id);

  const nextTrack = () => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    dispatch(setCurrentTrack(tracks[nextIndex]));
    dispatch(setIsPlaying(true));
  };

  const prevTrack = () => {
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    dispatch(setCurrentTrack(tracks[prevIndex]));
    dispatch(setIsPlaying(true));
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.track_file;
      audioRef.current.play();
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

  const handleEnded = () => {
    nextTrack();
  };

  if (!currentTrack) {
    return (
      <div className={styles.bar}>
        <div className={styles.bar__content}>
          <div className={styles.bar__playerProgress}></div>
          <div className={styles.bar__playerBlock}>
            <div className={styles.bar__player}>
              <div className={styles.player__controls}>
                <button className={styles.player__btnPrev} onClick={prevTrack}>
                  <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </button>
                <button className={styles.player__btnPlay} onClick={() => dispatch(setIsPlaying(!isPlaying))}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </button>
                <button className={styles.player__btnNext} onClick={nextTrack}>
                  <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </button>
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
                  <div className={styles.trackPlay__author}>
                    <span className={styles.trackPlay__authorLink}>Не выбрано</span>
                  </div>
                  <div className={styles.trackPlay__album}>
                    <span className={styles.trackPlay__albumLink}>Выберите трек</span>
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
                  <input className={styles.volume__progressLine} type="range" name="range" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <button className={styles.player__btnPrev} onClick={prevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <button className={styles.player__btnPlay} onClick={() => dispatch(setIsPlaying(!isPlaying))}>
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                </svg>
              </button>
              <button className={styles.player__btnNext} onClick={nextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
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
                <div className={styles.trackPlay__author}>
                  <Link href="/artist/1" className={styles.trackPlay__authorLink}>{currentTrack.author}</Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link href="/album/1" className={styles.trackPlay__albumLink}>{currentTrack.album}</Link>
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
                <input className={styles.volume__progressLine} type="range" name="range" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  );
}