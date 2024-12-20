import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import Router from '../../services/router';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { AppDispatch } from '../../services/store';
import {
  fetchIngredients,
  selectIngredients
} from '../../services/slices/ingredients';
import ModalRouter from '../../services/modalRouter';
import { fetchFeed, selectOrders } from '../../services/slices/feed';
import {
  fetchGetUser,
  selectIsAuthenticated
} from '../../services/slices/auth';
import { deleteCookie, getCookie } from '../../utils/cookie';

const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ingredients = useSelector(selectIngredients);
  const orders = useSelector(selectOrders);

  const token = getCookie('accessToken');
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && token) {
      dispatch(fetchGetUser())
        .unwrap()
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        });
    }
  }, []);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeed());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Router />
      <ModalRouter />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
