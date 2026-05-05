import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/data/tracks';

type initialStateType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  likedTracks: number[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  isRepeat: false,
  isShuffle: false,
  likedTracks: [],
};

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