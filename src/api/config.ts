export const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';


async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Ошибка ${response.status}`);
  }
  return response.json();
}


export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  return handleResponse<T>(response);
}


export async function post<T>(endpoint: string, data?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return handleResponse<T>(response);
}


export async function postWithAuth<T>(endpoint: string, data?: unknown): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return handleResponse<T>(response);
}


export async function getWithAuth<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse<T>(response);
}

export async function deleteWithAuth<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse<T>(response);
}

