import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AnalyticsState } from '../../types/types';

const initialState: AnalyticsState = {
    data: {},
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        fetchAnalyticsRequest(state, action: PayloadAction<{ owner: string; repo: string }>) {
            state.loading = true;
        },
        fetchAnalyticsSuccess(state, action: PayloadAction<any>) {
            const key = `${action.payload.owner}/${action.payload.repo}`;
            state.data[key] = action.payload;
            state.loading = false;
        },
        fetchAnalyticsFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    fetchAnalyticsRequest,
    fetchAnalyticsSuccess,
    fetchAnalyticsFailure,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
