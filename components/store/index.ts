import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
// import createSagaMiddleware from "@redux-saga/core";
import rootReducer from './reducers';
import rootSaga from './sagas';

import {createWrapper,Context} from 'next-redux-wrapper';

const bindMiddleware = (middleware: SagaMiddleware) => {
    if(process.env.NODE_ENV !== 'production'){
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(middleware))
    }
    return applyMiddleware(middleware)
};

export const makeStore = (context: Context) => {
    // create the middleware
    const sagaMiddleware = createSagaMiddleware();

    //add an extra parameter for applying middleware;
    type CombineStores = Store & {sagaTask?:any}
    const store:CombineStores = createStore(rootReducer,bindMiddleware(sagaMiddleware))
    //run your sagas on server
    store.sagaTask = sagaMiddleware.run(rootSaga);

    //return the store
    return store;
};
//export an assembled wrapper
export const wrapper = createWrapper(makeStore,{
    debug: true,
    serializeState: state => JSON.stringify(state),
    deserializeState: state => JSON.parse(state)
})
