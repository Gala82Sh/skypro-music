'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TrackList from '@/components/TrackList/TrackList';
import { getSelectionById, getTracksByIds, TrackItem } from '@/api/selectionApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './page.module.css';

interface Track {
  id: number;
  title: string;
  author: string;
  album: string;
  duration: string;
  genre: string;
  year: number;
  track_file: string;
}

export default function SelectionPage() {
  const { id } = useParams();
  const [selectionName, setSelectionName] = useState<string>('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadSelection() {
      setIsLoading(true);
      setError(null);
      try {
        const selection = await getSelectionById(id as string);
        if (!selection) {
          setError('Подборка не найдена');
          setIsLoading(false);
          return;
        }
        setSelectionName(selection.name || 'Подборка');
        const trackItems = await getTracksByIds(selection.items || []);
        const formattedTracks: Track[] = trackItems.map((item: TrackItem) => ({
          id: item._id,
          title: item.name || 'Без названия',
          author: item.author || 'Неизвестен',
          album: item.album || 'Сингл',
          duration: formatDuration(item.durationInSeconds || 0),
          genre: item.genre?.[0] || 'Другое',
          year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : new Date().getFullYear(),
          track_file: item.track_file || '',
        }));
        setTracks(formattedTracks);
      } catch (err) {
        setError('Не удалось загрузить подборку');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSelection();
  }, [id]);

  const formatDuration = (seconds: number): string => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{selectionName || 'Подборка'}</h1>
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

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{selectionName}</h1>
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
        <TrackList tracks={tracks} />
      </div>
    </div>
  );
}