import { Track } from '@/data/tracks-api';

export type SortType = 'default' | 'oldFirst' | 'newFirst';

interface FilterOptions {
  searchQuery: string;
  selectedAuthors: string[];
  selectedGenres: string[];
  sortBy: SortType;
}

export const filterTracks = (
  tracks: Track[],
  options: FilterOptions
): Track[] => {
  let result = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(options.searchQuery.toLowerCase()) ||
      track.author.toLowerCase().includes(options.searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(options.searchQuery.toLowerCase())
  );

  if (options.selectedAuthors.length > 0) {
    result = result.filter((track) =>
      options.selectedAuthors.includes(track.author)
    );
  }

  if (options.selectedGenres.length > 0) {
    result = result.filter((track) =>
      options.selectedGenres.includes(track.genre)
    );
  }

  if (options.sortBy === 'oldFirst') {
    result = [...result].sort((a, b) => a.year - b.year);
  } else if (options.sortBy === 'newFirst') {
    result = [...result].sort((a, b) => b.year - a.year);
  }

  return result;
};