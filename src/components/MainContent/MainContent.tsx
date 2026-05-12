'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchTracks, fetchLikedTracks } from '@/store/features/trackSlice';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { tracksApi as tracks } from '../../data/tracks-api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './MainContent.module.css';

export default function MainContent() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTracks()).finally(() => setIsLoading(false));
    if (accessToken) {
      dispatch(fetchLikedTracks());
    }
  }, [dispatch, accessToken]);

  if (isLoading) {
    return (
      <div className={styles.centerblock}>
        <h2 className={styles.centerblock__h2}>Треки</h2>
        <div className={styles.centerblock__content}>
          <div className={styles.content__title}>
            <div className={`${styles.playlistTitle__col} ${styles.col01}`}>Трек</div>
            <div className={`${styles.playlistTitle__col} ${styles.col02}`}>Исполнитель</div>
            <div className={`${styles.playlistTitle__col} ${styles.col03}`}>Альбом</div>
            <div className={`${styles.playlistTitle__col} ${styles.col04}`}>
              <svg className={styles.playlistTitle__svg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
              </svg>
            </div>
          </div>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '20px',
                  marginBottom: '20px',
                  alignItems: 'center',
                }}
              >
                <Skeleton width={51} height={51} circle />
                <div style={{ flex: 4 }}>
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="50%" height={16} style={{ marginTop: '8px' }} />
                </div>
                <div style={{ flex: 3 }}>
                  <Skeleton width="70%" height={20} />
                </div>
                <div style={{ flex: 2 }}>
                  <Skeleton width="60%" height={20} />
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton width={20} height={20} circle style={{ marginRight: '8px' }} />
                  <Skeleton width={40} height={20} />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return <CenterBlock title="Треки" tracks={tracks} />;
}