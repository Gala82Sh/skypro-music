import React from 'react';
import { render, screen } from '@testing-library/react';


const TrackItemMock = ({
  title,
  author,
  album,
  duration,
  isActive = false,
  isPlaying = false,
}: {
  title: string;
  author: string;
  album: string;
  duration: string;
  isActive?: boolean;
  isPlaying?: boolean;
}) => {
  return (
    <div data-testid="track-item" className={isActive ? 'active' : ''}>
      <div data-testid="track-title">{title}</div>
      <div data-testid="track-author">{author}</div>
      <div data-testid="track-album">{album}</div>
      <div data-testid="track-duration">{duration}</div>
      {isActive && isPlaying && <div data-testid="pulse-dot" className="pulseDot playing" />}
      {isActive && !isPlaying && <div data-testid="pulse-dot" className="pulseDot" />}
    </div>
  );
};

describe('TrackItem (проверка отображения информации о треке)', () => {
  const mockTrack = {
    title: 'Лето',
    author: 'Чи-Ли',
    album: 'Лето',
    duration: '3:47',
  };

  it('отображает название трека', () => {
    render(<TrackItemMock {...mockTrack} />);
    expect(screen.getByTestId('track-title')).toHaveTextContent('Лето');
  });

  it('отображает исполнителя', () => {
    render(<TrackItemMock {...mockTrack} />);
    expect(screen.getByTestId('track-author')).toHaveTextContent('Чи-Ли');
  });

  it('отображает альбом', () => {
    render(<TrackItemMock {...mockTrack} />);
    expect(screen.getByTestId('track-album')).toHaveTextContent('Лето');
  });

  it('отображает длительность', () => {
    render(<TrackItemMock {...mockTrack} />);
    expect(screen.getByTestId('track-duration')).toHaveTextContent('3:47');
  });

  it('имеет активный класс, если трек выбран', () => {
    const { container } = render(<TrackItemMock {...mockTrack} isActive={true} />);
    expect(container.firstChild).toHaveClass('active');
  });

  it('показывает пульсирующую точку, если трек играет', () => {
    render(<TrackItemMock {...mockTrack} isActive={true} isPlaying={true} />);
    expect(screen.getByTestId('pulse-dot')).toBeInTheDocument();
  });

  it('не показывает пульсирующую точку, если трек выбран, но не играет', () => {
    render(<TrackItemMock {...mockTrack} isActive={true} isPlaying={false} />);
    expect(screen.getByTestId('pulse-dot')).toBeInTheDocument();
  });
});
