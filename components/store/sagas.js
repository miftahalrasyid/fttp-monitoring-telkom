import { all } from "redux-saga/effects";
import ODCsSaga from './odcs/saga'
import LoginSaga from './login/saga'

export default function* rootSaga() {
    yield all([
        ODCsSaga(),
        LoginSaga()
    ]);
}