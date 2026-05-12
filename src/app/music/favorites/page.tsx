'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { fetchLikedTracks } from '@/store/features/trackSlice';
import { tracksApi as tracks } from '@/data/tracks-api';
import TrackList from '@/components/TrackList/TrackList';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './page.module.css';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const likedTracks = useAppSelector((state) => state.tracks.likedTracks);

  useEffect(() => {
  if (!accessToken) {
    router.push('/');  
    return;
  }

  setIsLoading(true);
  dispatch(fetchLikedTracks()).finally(() => setIsLoading(false));
}, [dispatch, accessToken, router]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Избранное</h1>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
              <Skeleton width={51} height={51} circle />
              <div style={{ flex: 1 }}>
                <Skeleton width="80%" height={20} />
                <Skeleton width="50%" height={16} style={{ marginTop: '8px' }} />
              </div>
            </div>
          ))}
      </div>
    );
  }

  const favoriteTracks = tracks.filter((track) => likedTracks.includes(track.id));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      <div className={styles.content}>
        <div className={styles.playlistTitle}>
          <div className={styles.col01}>Трек</div>
          <div className={styles.col02}>Исполнитель</div>
          <div className={styles.col03}>Альбом</div>
          <div className={styles.col04}>
            <svg className={styles.watchIcon}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {favoriteTracks.length === 0 ? (
          <div className={styles.emptyMessage}>
            У вас пока нет избранных треков. Добавьте понравившиеся треки, нажав на сердечко ❤️
          </div>
        ) : (
          <TrackList tracks={favoriteTracks} />
        )}
      </div>
    </div>
  );
}

