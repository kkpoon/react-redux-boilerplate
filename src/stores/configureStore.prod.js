'use strict';

import { compose, createStore, combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import createHistory from 'history/lib/createHashHistory';
//import createHistory from 'history/lib/createBrowserHistory';
/*  To use browser history, you have to config your web server
 *  https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md
 *
 */

import reducers from '../reducers';

const finalCreateStore = compose(
)(createStore);

function configureStore(initialState) {
  let reducersWithRoutes = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));

  let store = finalCreateStore(reducersWithRoutes);
  let history = createHistory();

  syncReduxAndRouter(history, store);

  return {store, history};
}

export default configureStore;
