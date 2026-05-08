import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/data/tracks';
import { get } from '@/api/config';

type initialStateType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  likedTracks: number[];
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  isRepeat: false,
  isShuffle: false,
  likedTracks: [],
  tracks: [],
  isLoading: false,
  error: null,
};


export const fetchTracks = createAsyncThunk(
  'tracks/fetchTracks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get<{ success: boolean; data: any[] }>('/catalog/track/all/');
      const tracks: Track[] = response.data.map((item: any) => ({
        id: item._id,
        title: item.name,
        author: item.author || 'Неизвестен',
        album: item.album || 'Сингл',
        duration: item.duration || '0:00',
        genre: item.genre || 'Другое',
        year: item.year || new Date().getFullYear(),
        track_file: item.track_file || '',
      }));
      return tracks;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ошибка загрузки треков');
    }
  }
);

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    playTrack: (state) => {
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    setRepeat: (state, action: PayloadAction<boolean>) => {
      state.isRepeat = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.likedTracks.includes(id)) {
        state.likedTracks = state.likedTracks.filter(trackId => trackId !== id);
      } else {
        state.likedTracks.push(id);
      }
    },
    setLikedTracks: (state, action: PayloadAction<number[]>) => {
      state.likedTracks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setCurrentTrack, 
  setIsPlaying, 
  playTrack, 
  pauseTrack, 
  togglePlay,
  toggleRepeat,
  setRepeat,
  toggleShuffle,
  setShuffle,
  toggleLike,
  setLikedTracks,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;