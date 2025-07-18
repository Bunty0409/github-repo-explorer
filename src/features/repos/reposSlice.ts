// src/features/repos/reposSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface RepoState {
  list: any[];
  loading: boolean;
  error: string | null;
  timeRange: '1week' | '2weeks' | '1month';
  page: number;
}

const initialState: RepoState = {
  list: [],
  loading: false,
  error: null,
  timeRange: '1month',
  page: 1,
};

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    fetchReposRequest(state) {
      state.loading = true;
    },
    fetchReposSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.list.push(...action.payload);
      state.page += 1;
    },
    fetchReposFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setTimeRange(state, action: PayloadAction<RepoState['timeRange']>) {
      state.timeRange = action.payload;
      state.page = 1;
      state.list = [];
    },
    resetRepos(state) {
      state.page = 1;
      state.list = [];
    },
  },
});

export const {
  fetchReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
  setTimeRange,
  resetRepos,
} = reposSlice.actions;

export default reposSlice.reducer;
