'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { fetchLikedTracks } from '@/store/features/trackSlice';
import TrackList from '@/components/TrackList/TrackList';
import { tracksApi as tracks } from '@/data/tracks-api';
import styles from './page.module.css';

export default function FavoritesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { likedTracks, isLoading } = useAppSelector((state) => state.tracks);
  const { accessToken } = useAppSelector((state) => state.auth);

 
  useEffect(() => {
    if (!accessToken) {
      router.push('/auth/login');
    }
  }, [accessToken, router]);

 
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchLikedTracks());
    }
  }, [dispatch, accessToken]);

  const favoriteTracks = tracks.filter((track) => likedTracks.includes(track.id));

  if (!accessToken) {
    return null; 
  }

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
