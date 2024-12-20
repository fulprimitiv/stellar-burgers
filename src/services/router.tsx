import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '../utils/protected-route';

const Router = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <Routes location={backgroundLocation || location}>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute unAuthOnly>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/login'
        element={
          <ProtectedRoute unAuthOnly>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<NotFound404 />} />
      <Route
        path='/register'
        element={
          <ProtectedRoute unAuthOnly>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute unAuthOnly>
            <ResetPassword />
          </ProtectedRoute>
        }
      />

      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/ingredients/:id' element={<IngredientDetails />} />
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
