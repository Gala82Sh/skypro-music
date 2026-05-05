'use client';

import { useState } from 'react';
import styles from './MainContent.module.css';
import TrackList from '../TrackList/TrackList';
import { tracks } from '../../data/tracks';

export default function MainContent() {
  const [activeFilter, setActiveFilter] = useState<'author' | 'year' | 'genre' | null>(null);


  const uniqueAuthors = [...new Set(tracks.map((track) => track.author))];
  const uniqueGenres = [...new Set(tracks.map((track) => track.genre))];
  const uniqueYears = [...new Set(tracks.map((track) => track.year))].sort((a, b) => a - b);

  const toggleFilter = (filter: 'author' | 'year' | 'genre') => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

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
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <button
          className={`${styles.filter__button} ${activeFilter === 'author' ? styles.active : ''}`}
          onClick={() => toggleFilter('author')}
        >
          исполнителю
        </button>
        <button
          className={`${styles.filter__button} ${activeFilter === 'year' ? styles.active : ''}`}
          onClick={() => toggleFilter('year')}
        >
          году выпуска
        </button>
        <button
          className={`${styles.filter__button} ${activeFilter === 'genre' ? styles.active : ''}`}
          onClick={() => toggleFilter('genre')}
        >
          жанру
        </button>
      </div>

      {}
      {activeFilter === 'author' && (
        <div className={styles.filter__list}>
          {uniqueAuthors.map((author) => (
            <div key={author} className={styles.filter__item}>
              {author}
            </div>
          ))}
        </div>
      )}

      {}
      {activeFilter === 'year' && (
        <div className={styles.filter__list}>
          {uniqueYears.map((year) => (
            <div key={year} className={styles.filter__item}>
              {year}
            </div>
          ))}
        </div>
      )}

      {}
      {activeFilter === 'genre' && (
        <div className={styles.filter__list}>
          {uniqueGenres.map((genre) => (
            <div key={genre} className={styles.filter__item}>
              {genre}
            </div>
          ))}
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

        <TrackList />
      </div>
    </div>
  );
}