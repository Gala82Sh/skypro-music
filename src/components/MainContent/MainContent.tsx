'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchTracks, fetchLikedTracks } from '@/store/features/trackSlice';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import { tracksApi as tracks } from '../../data/tracks-api';

export default function MainContent() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTracks());
    if (accessToken) {
      dispatch(fetchLikedTracks());
    }
  }, [dispatch, accessToken]);

  return <CenterBlock title="Треки" tracks={tracks} />;
}