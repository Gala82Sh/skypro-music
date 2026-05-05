import React from 'react';
import styles from './TrackList.module.css';
import TrackItem from '../TrackItem/TrackItem';
import { tracks } from '../../data/tracks';

export default function TrackList() {
  return (
    <div className={styles.content__playlist}>
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          id={track.id}
          title={track.title}
          author={track.author}
          album={track.album}
          duration={track.duration}
          genre={track.genre}
          year={track.year}
          trackFile={track.track_file}
        />
      ))}
    </div>
  );
}
