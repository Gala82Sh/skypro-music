export interface Track {
  id: number;       
  title: string;     
  author: string;     
  album: string;   
  duration: string;   
  genre: string;      
  year: number;       
}


export const tracks: Track[] = [
  {
    id: 1,
    title: 'Guilt',
    author: 'Nero',
    album: 'Welcome Reality',
    duration: '4:44',
    genre: 'Drum & Bass',
    year: 2010,
  },
  {
    id: 2,
    title: 'Elektro',
    author: 'Dynoro, Outwork, Mr. Gee',
    album: 'Elektro',
    duration: '2:22',
    genre: 'House',
    year: 2016,
  },
  {
    id: 3,
    title: 'I’m Fire',
    author: 'Ali Bakgor',
    album: 'I’m Fire',
    duration: '2:22',
    genre: 'Electronic',
    year: 2019,
  },
  {
    id: 4,
    title: 'Non Stop',
    author: 'Стоункат, Psychopath',
    album: 'Non Stop',
    duration: '4:12',
    genre: 'Rap',
    year: 2020,
  },
  {
    id: 5,
    title: 'Run Run',
    author: 'Jaded, Will Clarke, AR/CO',
    album: 'Run Run',
    duration: '2:54',
    genre: 'House',
    year: 2021,
  },
];