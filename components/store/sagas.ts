import { all } from "redux-saga/effects";
import ODCsSaga from './odcs/saga'
import LoginSaga from './auth/saga'
import UserSaga from './users/saga'
import LayoutSaga from './layouts/saga'

export default function* rootSaga() {
    yield all([
        ODCsSaga(),
        LoginSaga(),
        UserSaga(),
        LayoutSaga(),
    ]);
}