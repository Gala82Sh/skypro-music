'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getSelectionById, getTracksByIds, TrackItem } from '@/api/selectionApi';
import { Track } from '@/data/tracks';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import PlayerBar from '@/components/PlayerBar/PlayerBar';
import styles from './page.module.css';
import './page.css';

const CenterBlock = dynamic(() => import('@/components/CenterBlock/CenterBlock'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Загрузка...</div>,
});

export default function SelectionPage() {
  const { id } = useParams();
  const [selectionName, setSelectionName] = useState<string>('Подборка');
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

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Header />
          <CenterBlock
            title={selectionName}
            tracks={tracks}
            emptyMessage="Нет треков в этой подборке"
            isLoading={isLoading}
          />
          <Sidebar />
        </main>
        <PlayerBar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
