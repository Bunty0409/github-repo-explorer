// src/features/analytics/analyticsSaga.ts
import { call, put, takeLatest, all, delay } from 'redux-saga/effects';

import {
  fetchAnalyticsRequest,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} from './analyticsSlice';
import apiEndpoints from '../../api/apiEndpoints';
import axiosInstance from '../../api/axiosInstance';

// Retry logic for GitHub's stats API
function* fetchWithRetry(url: string, retries = 10, waitMs = 2000): any {
  for (let i = 0; i < retries; i++) {
    const response = yield call(axiosInstance.get, url);

    if (
      response.status === 202 ||
      !response.data ||
      (Array.isArray(response.data) && response.data.length === 0)
    ) {
      console.warn(`Waiting for GitHub stats for: ${url} (try ${i + 1}/${retries})`);
      yield delay(waitMs);
      continue;
    }

    return response;
  }

  throw new Error(`GitHub stats not ready after ${retries} retries: ${url}`);
}


// Main worker saga
function* fetchAnalyticsWorker(action: ReturnType<typeof fetchAnalyticsRequest>): any {
  const { owner, repo } = action.payload;

  console.log("Fetching analytics for:", owner, repo);

  try {
    const { commitActivity, codeFrequency, contributors } = apiEndpoints.analytics(owner, repo);

    const [commitActivityRes, codeFrequencyRes, contributorsRes] = yield all([
      call(fetchWithRetry, commitActivity),
      call(fetchWithRetry, codeFrequency),
      call(fetchWithRetry, contributors),
    ]);

    const filteredCommitActivity = commitActivityRes.data.filter((week: any) => week.total > 0);

    yield put(fetchAnalyticsSuccess({
      owner,
      repo,
      commitActivity: filteredCommitActivity,
      codeFrequency: codeFrequencyRes.data,
      contributors: contributorsRes.data,
    }));
  } catch (error: any) {
    console.error("Analytics fetch failed:", error);
    yield put(fetchAnalyticsFailure(error.message));
  }
}

// Watcher saga
export function* analyticsSaga() {
  yield takeLatest(fetchAnalyticsRequest.type, fetchAnalyticsWorker);
}
