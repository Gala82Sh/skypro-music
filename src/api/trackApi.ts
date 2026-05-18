import { API_BASE_URL } from './config';

export async function getFavoriteTracks(token?: string): Promise<number[]> {
  const accessToken = token || localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Не авторизован');
  }
  
  const response = await fetch(`${API_BASE_URL}/catalog/track/favorite/all/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('401');
    }
    throw new Error(`Ошибка ${response.status}`);
  }
  
  const data = await response.json();
  return data.data.map((item: { _id: number }) => item._id);
}


export async function addTrackToFavorite(trackId: number, token?: string): Promise<void> {
  const accessToken = token || localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Не авторизован');
  }
  
  const response = await fetch(`${API_BASE_URL}/catalog/track/${trackId}/favorite/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('401');
    }
    throw new Error(`Ошибка ${response.status}`);
  }
}


export async function removeTrackFromFavorite(trackId: number, token?: string): Promise<void> {
  const accessToken = token || localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Не авторизован');
  }
  
  const response = await fetch(`${API_BASE_URL}/catalog/track/${trackId}/favorite/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('401');
    }
    throw new Error(`Ошибка ${response.status}`);
  }
}