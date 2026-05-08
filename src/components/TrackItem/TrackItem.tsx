'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlaying, likeTrack, unlikeTrack } from '@/store/features/trackSlice';
import Toast from '../Toast/Toast';
import styles from './TrackItem.module.css';

interface TrackItemProps {
  id: number;
  title: string;
  author: string;
  album: string;
  duration: string;
  genre: string;
  year: number;
  trackFile: string;
  href?: string;
}

export default function TrackItem({
  id,
  title,
  author,
  album,
  duration,
  genre,
  year,
  trackFile,
  href = '/',
}: TrackItemProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, likedTracks } = useAppSelector((state) => state.tracks);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const trackData = {
    id,
    title,
    author,
    album,
    duration,
    genre,
    year,
    track_file: trackFile,
  };

  const isActiveTrack = currentTrack?.id === id;
  const isPlayingNow = isActiveTrack && isPlaying;
  const isLiked = likedTracks.includes(id);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack(trackData));
    dispatch(setIsPlaying(true));
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (isLiked) {
        await dispatch(unlikeTrack(id)).unwrap();
        setToastMessage('Лайк удалён');
      } else {
        await dispatch(likeTrack(id)).unwrap();
        setToastMessage('Добавлено в избранное');
      }
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      setToastMessage('Ошибка. Попробуйте позже');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <>
      <div
        className={`${styles.playlist__item} ${isActiveTrack ? styles.active : ''}`}
        onClick={handleTrackClick}
      >
        <div className={styles.playlist__track}>
          <div className={styles.track__title}>
            <div className={styles.track__titleImage}>
              {isActiveTrack ? (
                <div className={`${styles.pulseDot} ${isPlayingNow ? styles.playing : ''}`} />
              ) : (
                <svg className={styles.track__titleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                </svg>
              )}
            </div>
            <div className={styles.track__titleText}>
              <Link href={href} className={styles.track__titleLink}>
                {title} <span className={styles.track__titleSpan}></span>
              </Link>
            </div>
          </div>
          <div className={styles.track__author}>
            <Link href={href} className={styles.track__authorLink}>{author}</Link>
          </div>
          <div className={styles.track__album}>
            <Link href={href} className={styles.track__albumLink}>{album}</Link>
          </div>
          <div className={styles.track__time}>
            <button
              onClick={handleLikeClick}
              className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
              aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
            >
              <svg className={styles.track__timeSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
              </svg>
            </button>
            <span className={styles.track__timeText}>{duration}</span>
          </div>
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} type={toastMessage.includes('Ошибка') ? 'error' : 'success'} onClose={() => setToastMessage(null)} />}
    </>
  );
}