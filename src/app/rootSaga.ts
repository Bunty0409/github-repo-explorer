import { all } from 'redux-saga/effects';
import { reposSaga } from '../features/repos/reposSaga';
import { analyticsSaga } from '../features/analytics/analyticsSaga';

export default function* rootSaga() {
  yield all([reposSaga(), analyticsSaga()]);
}
