import { all } from "redux-saga/effects";
import ODCsSaga from './odcs/saga'

export default function* rootSaga() {
    yield all([
        ODCsSaga(),
    ]);
}