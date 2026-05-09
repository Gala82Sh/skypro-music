import { filterTracks } from '../filterTracks';
import { Track } from '@/data/tracks-api';

const mockTracks: Track[] = [
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
  {
    id: 3,
    title: 'Angel',
    author: 'Morandi',
    album: 'Angels',
    duration: '3:44',
    genre: 'Pop',
    year: 2015,
    track_file: '/music/morandi-angel.mp3',
  },
];

describe('filterTracks', () => {
  it('возвращает все треки, если фильтры не заданы', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: '',
      selectedAuthors: [],
      selectedGenres: [],
      sortBy: 'default',
    });
    expect(result.length).toBe(3);
  });

  it('фильтрует по поисковому запросу (название трека)', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: 'Лето',
      selectedAuthors: [],
      selectedGenres: [],
      sortBy: 'default',
    });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Лето');
  });

  it('фильтрует по поисковому запросу (исполнитель)', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: 'Morandi',
      selectedAuthors: [],
      selectedGenres: [],
      sortBy: 'default',
    });
    expect(result.length).toBe(1);
    expect(result[0].author).toBe('Morandi');
  });

  it('фильтрует по выбранным авторам', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: '',
      selectedAuthors: ['Чи-Ли', 'Morandi'],
      selectedGenres: [],
      sortBy: 'default',
    });
    expect(result.length).toBe(2);
    expect(result.map(t => t.author)).toEqual(expect.arrayContaining(['Чи-Ли', 'Morandi']));
  });

  it('фильтрует по выбранным жанрам', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: '',
      selectedAuthors: [],
      selectedGenres: ['Pop'],
      sortBy: 'default',
    });
    expect(result.length).toBe(2);
    expect(result[0].genre).toBe('Pop');
    expect(result[1].genre).toBe('Pop');
  });

  it('сортирует от старых к новым', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: '',
      selectedAuthors: [],
      selectedGenres: [],
      sortBy: 'oldFirst',
    });
    expect(result[0].year).toBe(2010);
    expect(result[1].year).toBe(2015);
    expect(result[2].year).toBe(2025);
  });

  it('сортирует от новых к старым', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: '',
      selectedAuthors: [],
      selectedGenres: [],
      sortBy: 'newFirst',
    });
    expect(result[0].year).toBe(2025);
    expect(result[1].year).toBe(2015);
    expect(result[2].year).toBe(2010);
  });

  it('комбинирует фильтрацию и сортировку', () => {
    const result = filterTracks(mockTracks, {
      searchQuery: '',
      selectedAuthors: [],
      selectedGenres: ['Pop'],
      sortBy: 'oldFirst',
    });
    expect(result.length).toBe(2);
    expect(result[0].year).toBe(2010);
    expect(result[1].year).toBe(2015);
  });
});