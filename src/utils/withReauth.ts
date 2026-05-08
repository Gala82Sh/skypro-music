import { refreshAccessToken } from '@/store/features/authSlice';
import { store } from '@/store/store';

export async function withReauth<T>(
  apiCall: (token?: string) => Promise<T>,
  refreshToken: string | null
): Promise<T> {
  try {
    return await apiCall();
  } catch (error: any) {
    
    if (error?.message?.includes('401') || error?.status === 401) {
      if (!refreshToken) {
        throw new Error('Нет refresh-токена');
      }
      
      try {
        const result = await store.dispatch(refreshAccessToken(refreshToken)).unwrap();
        const newAccessToken = result.accessToken;
        
        return await apiCall(newAccessToken);
      } catch (refreshError) {
        throw new Error('Сессия истекла, войдите заново');
      }
    }
    throw error;
  }
}
