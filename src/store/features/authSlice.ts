import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { post } from '@/api/config';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: { email: string; username: string; id: number } | null;
  isLoading: boolean;
  error: string | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

interface TokensResponse {
  access: string;
  refresh: string;
}

interface UserData {
  email: string;
  username: string;
  _id: number;
}


const loadTokens = () => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }
  return { accessToken: null, refreshToken: null };
};


const loadUser = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const { accessToken, refreshToken } = loadTokens();

const initialState: AuthState = {
  accessToken,
  refreshToken,
  user: loadUser(),
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const result = await post<{ success: boolean; message: string; result: UserData }>('/user/signup/', userData);
      if (!result.success) {
        return rejectWithValue(result.message);
      }
      return { user: result.result };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ошибка регистрации');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const tokens = await post<TokensResponse>('/user/token/', loginData);
      const user = await post<UserData>('/user/login/', loginData);
      return {
        tokens,
        user,
      };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ошибка входа');
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refresh',
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const result = await post<{ access: string }>('/user/token/refresh/', { refresh: refreshToken });
      return { accessToken: result.access };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ошибка обновления токена');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.tokens.access;
        state.refreshToken = action.payload.tokens.refresh;
        state.user = {
          email: action.payload.user.email,
          username: action.payload.user.username,
          id: action.payload.user._id,
        };
        localStorage.setItem('accessToken', action.payload.tokens.access);
        localStorage.setItem('refreshToken', action.payload.tokens.refresh);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;