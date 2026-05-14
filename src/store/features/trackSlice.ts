import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/data/tracks';
import { get } from '@/api/config';
import { getFavoriteTracks, addTrackToFavorite, removeTrackFromFavorite } from '@/api/trackApi';
import { withReauth } from '@/utils/withReauth';
import { RootState } from '@/store/store';

interface ServerTrack {
  _id: number;
  name: string;
  author?: string;
  album?: string;
  duration?: string;
  genre?: string;
  year?: number;
  track_file?: string;
}

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
      const response = await get<{ success: boolean; data: ServerTrack[] }>('/catalog/track/all/');
      const tracks: Track[] = response.data.map((item: ServerTrack) => ({
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

export const fetchLikedTracks = createAsyncThunk(
  'tracks/fetchLikedTracks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;
      
      const likedIds = await withReauth(
        (token) => getFavoriteTracks(token),
        refreshToken
      );
      return likedIds;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ошибка загрузки избранного');
    }
  }
);

export const likeTrack = createAsyncThunk(
  'tracks/likeTrack',
  async (trackId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;
      
      await withReauth(
        (token) => addTrackToFavorite(trackId, token),
        refreshToken
      );
      
      return trackId;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ошибка при добавлении лайка');
    }
  }
);

export const unlikeTrack = createAsyncThunk(
  'tracks/unlikeTrack',
  async (trackId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;
      
      await withReauth(
        (token) => removeTrackFromFavorite(trackId, token),
        refreshToken
      );
      
      return trackId;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ошибка при удалении лайка');
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
    toggleLikeLocal: (state, action: PayloadAction<number>) => {
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
      })
      .addCase(fetchLikedTracks.fulfilled, (state, action) => {
        state.likedTracks = action.payload;
      })
      .addCase(fetchLikedTracks.rejected, (state, action) => {
        console.error('Ошибка загрузки избранного:', action.payload);
      })
      .addCase(likeTrack.fulfilled, (state, action) => {
        const trackId = action.payload;
        if (!state.likedTracks.includes(trackId)) {
          state.likedTracks.push(trackId);
        }
      })
      .addCase(unlikeTrack.fulfilled, (state, action) => {
        const trackId = action.payload;
        state.likedTracks = state.likedTracks.filter(id => id !== trackId);
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
  toggleLikeLocal,
  setLikedTracks,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;