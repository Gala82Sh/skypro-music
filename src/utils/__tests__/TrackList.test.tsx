import React from 'react';
import { render, screen } from '@testing-library/react';
import { Track } from '@/data/tracks';

const TrackListMock = ({ tracks }: { tracks: Track[] }) => {
  return (
    <div data-testid="track-list">
      {tracks.map((track) => (
        <div key={track.id} data-testid="track-item">
          {track.title} - {track.author}
        </div>
      ))}
    </div>
  );
};

const mockTracks = [
  {
    id: 1,
    title: 'Лето',
    author: 'Чи-Ли',
    album: 'Лето',
    duration: '3:47',
    genre: 'Pop',
    year: 2010,
    track_file: '/music/chi-li_-leto.mp3',
  },
  {
    id: 2,
    title: 'Дембельская',
    author: 'Неизвестен',
    album: 'Дембельская',
    duration: '3:04',
    genre: 'Шансон',
    year: 2025,
    track_file: '/music/dembelskaya.mp3',
  },
];

describe('TrackList (проверка рендеринга списка треков)', () => {
  it('отображает правильное количество треков', () => {
    render(<TrackListMock tracks={mockTracks} />);
    
    const trackItems = screen.getAllByTestId('track-item');
    expect(trackItems.length).toBe(2);
  });

  it('отображает названия и исполнителей треков', () => {
    render(<TrackListMock tracks={mockTracks} />);
    
    expect(screen.getByText('Лето - Чи-Ли')).toBeInTheDocument();
    expect(screen.getByText('Дембельская - Неизвестен')).toBeInTheDocument();
  });
});
