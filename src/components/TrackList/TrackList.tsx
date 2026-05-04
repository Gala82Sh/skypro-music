import TrackItem from '../TrackItem/TrackItem';
import styles from './TrackList.module.css';

const tracks = [
  { title: 'Guilt', author: 'Nero', album: 'Welcome Reality', time: '4:44' },
  { title: 'Elektro', author: 'Dynoro, Outwork, Mr. Gee', album: 'Elektro', time: '2:22' },
  { title: 'I’m Fire', author: 'Ali Bakgor', album: 'I’m Fire', time: '2:22' },
  { title: 'Non Stop', author: 'Стоункат, Psychopath', album: 'Non Stop', time: '4:12' },
  { title: 'Run Run', author: 'Jaded, Will Clarke, AR/CO', album: 'Run Run', time: '2:54' },
];

export default function TrackList() {
  return (
    <div className={styles.content__playlist}>
      {tracks.map((track, idx) => (
        <TrackItem key={idx} {...track} />
      ))}
    </div>
  );
}