import { get } from './config';

export interface Selection {
  id: number;
  name: string;
  items: number[]; 
  owner?: number[];
}

export interface TrackItem {
  _id: number;
  name: string;
  author: string;
  album: string;
  durationInSeconds: number;
  genre: string[];
  releaseDate: string;
  track_file: string;
}


export async function getAllSelections(): Promise<Selection[]> {
  const response = await get<{ success: boolean; data: Selection[] }>('/catalog/selection/all');
  return response.data;
}


export async function getSelectionById(id: string): Promise<Selection> {
  const response = await get<{ success: boolean; data: Selection }>(`/catalog/selection/${id}`);
  return response.data;
}


export async function getTracksByIds(ids: number[]): Promise<TrackItem[]> {
 
  const promises = ids.map(async (id) => {
    const response = await get<{ success: boolean; data: TrackItem }>(`/catalog/track/${id}`);
    return response.data;
  });
  return Promise.all(promises);
}