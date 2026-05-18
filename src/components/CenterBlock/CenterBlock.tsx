'use client';

import { useState, useRef } from 'react';
import styles from './CenterBlock.module.css';
import TrackList from '../TrackList/TrackList';
import { filterTracks, SortType } from '@/utils/filterTracks';
import { Track } from '@/data/tracks-api';

interface CenterBlockProps {
  title: string;
  tracks: Track[];
  emptyMessage?: string;
  isLoading?: boolean; 
}

export default function CenterBlock({ title, tracks, emptyMessage }: CenterBlockProps) {


  const [activeFilter, setActiveFilter] = useState<'author' | 'year' | 'genre' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPosition, setFilterPosition] = useState<{ top: number; left: number } | null>(null);

  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortType>('default');

  const authorButtonRef = useRef<HTMLButtonElement>(null);
  const yearButtonRef = useRef<HTMLButtonElement>(null);
  const genreButtonRef = useRef<HTMLButtonElement>(null);

  const uniqueAuthors = [...new Set(tracks.map((track) => track.author))];
  const uniqueGenres = [...new Set(tracks.map((track) => track.genre))];
  const uniqueYears = [...new Set(tracks.map((track) => track.year))].sort((a, b) => a - b);

  const toggleFilter = (filter: 'author' | 'year' | 'genre') => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setFilterPosition(null);
      return;
    }

    let button: HTMLButtonElement | null = null;
    if (filter === 'author') button = authorButtonRef.current;
    if (filter === 'year') button = yearButtonRef.current;
    if (filter === 'genre') button = genreButtonRef.current;

    if (button) {
      const rect = button.getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }

    setActiveFilter(filter);
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const filteredTracks = filterTracks(tracks, {
    searchQuery,
    selectedAuthors,
    selectedGenres,
    sortBy,
  });


  if (tracks.length === 0 && emptyMessage) {
    return (
      <div className={styles.centerblock}>
        <div className={styles.centerblock__search}>
          <svg className={styles.search__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
          </svg>
          <input
            className={styles.search__text}
            type="search"
            placeholder="Поиск"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <h2 className={styles.centerblock__h2}>{title}</h2>
        <div className={styles.emptyMessage}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <button
          ref={authorButtonRef}
          className={`${styles.filter__button} ${activeFilter === 'author' ? styles.active : ''}`}
          onClick={() => toggleFilter('author')}
        >
          исполнителю
          {selectedAuthors.length > 0 && (
            <span className={styles.filterBadge}>{selectedAuthors.length}</span>
          )}
        </button>
        <button
          ref={yearButtonRef}
          className={`${styles.filter__button} ${activeFilter === 'year' ? styles.active : ''}`}
          onClick={() => toggleFilter('year')}
        >
          году выпуска
          {sortBy !== 'default' && (
            <span className={styles.filterBadge}>1</span>
          )}
        </button>
        <button
          ref={genreButtonRef}
          className={`${styles.filter__button} ${activeFilter === 'genre' ? styles.active : ''}`}
          onClick={() => toggleFilter('genre')}
        >
          жанру
          {selectedGenres.length > 0 && (
            <span className={styles.filterBadge}>{selectedGenres.length}</span>
          )}
        </button>
      </div>

      {activeFilter === 'author' && filterPosition && (
        <div
          className={styles.filter__list}
          style={{
            position: 'fixed',
            top: filterPosition.top,
            left: filterPosition.left,
          }}
        >
          <div className={styles.filter__inner}>
            <div className={styles.filter__listContainer}>
              {uniqueAuthors.map((author) => (
                <div
                  key={author}
                  className={`${styles.filter__item} ${selectedAuthors.includes(author) ? styles.active : ''}`}
                  onClick={() => toggleAuthor(author)}
                >
                  {author}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeFilter === 'year' && filterPosition && (
        <div
          className={styles.filter__list}
          style={{
            position: 'fixed',
            top: filterPosition.top,
            left: filterPosition.left,
          }}
        >
          <div className={styles.filter__inner}>
            <div className={styles.filter__listContainer}>
              <div
                className={`${styles.filter__item} ${sortBy === 'default' ? styles.active : ''}`}
                onClick={() => {
                  setSortBy('default');
                  setActiveFilter(null);
                  setFilterPosition(null);
                }}
              >
                По умолчанию
              </div>
              <div
                className={`${styles.filter__item} ${sortBy === 'oldFirst' ? styles.active : ''}`}
                onClick={() => {
                  setSortBy('oldFirst');
                  setActiveFilter(null);
                  setFilterPosition(null);
                }}
              >
                Сначала старые
              </div>
              <div
                className={`${styles.filter__item} ${sortBy === 'newFirst' ? styles.active : ''}`}
                onClick={() => {
                  setSortBy('newFirst');
                  setActiveFilter(null);
                  setFilterPosition(null);
                }}
              >
                Сначала новые
              </div>
            </div>
          </div>
        </div>
      )}

      {activeFilter === 'genre' && filterPosition && (
        <div
          className={styles.filter__list}
          style={{
            position: 'fixed',
            top: filterPosition.top,
            left: filterPosition.left,
          }}
        >
          <div className={styles.filter__inner}>
            <div className={styles.filter__listContainer}>
              {uniqueGenres.map((genre) => (
                <div
                  key={genre}
                  className={`${styles.filter__item} ${selectedGenres.includes(genre) ? styles.active : ''}`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

        <TrackList tracks={filteredTracks} />
      </div>
    </div>
  );
}
