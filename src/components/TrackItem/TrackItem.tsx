'use client';

import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlaying } from '@/store/features/trackSlice';
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
  const { currentTrack, isPlaying } = useAppSelector((state) => state.tracks);

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

  const handleTrackClick = () => {
    console.log('🖱️ Клик по треку:', trackData);
    dispatch(setCurrentTrack(trackData));
    dispatch(setIsPlaying(true));
  };

  return (
    <div
      className={`${styles.playlist__item} ${isActiveTrack ? styles.active : ''}`}
      onClick={handleTrackClick}
    >
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isPlayingNow ? (
              <div className={styles.pulseDot} />
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
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{duration}</span>
        </div>
      </div>
    </div>
  );
}