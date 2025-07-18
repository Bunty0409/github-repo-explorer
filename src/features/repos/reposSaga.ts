import { call, put, select, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import { format, subDays } from 'date-fns';
import {
    fetchReposRequest,
    fetchReposSuccess,
    fetchReposFailure,
} from './reposSlice';
import type { RootState } from '../../app/store';
import apiEndpoints from '../../api/apiEndpoints';

const timeRangeMap = {
    '1week': 7,
    '2weeks': 14,
    '1month': 30,
};

//
function* fetchReposWorker(): any {
    try {
        const state: RootState = yield select();
        const { timeRange, page } = state.repos;
        const days = timeRangeMap[timeRange];
        const date = format(subDays(new Date(), days), 'yyyy-MM-dd');

        const apiUrl = apiEndpoints.searchRepos(date, page);

        const response = yield call(axiosInstance.get, apiUrl);
        yield put(fetchReposSuccess(response.data.items));
    } catch (error: any) {
        yield put(fetchReposFailure(error.message));
    }
}

export function* reposSaga() {
    yield takeLatest(fetchReposRequest.type, fetchReposWorker);
}
