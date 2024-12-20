import { useDispatch, useSelector } from './store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { closeModal, selectIsModalOpened } from './slices/modal';
import { IngredientDetails, Modal, OrderInfo } from '@components';
import React from 'react';
import { ProtectedRoute } from '../utils/protected-route';

const ModalRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const isModalOpen = useSelector(selectIsModalOpened);

  if (!isModalOpen || !backgroundLocation) {
    return null;
  }

  return (
    <Routes>
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title='Описание ингредиента'
            onClose={() => {
              dispatch(closeModal());
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/feed/:number'
        element={
          <Modal
            title={'Заказ'}
            onClose={() => {
              dispatch(closeModal());
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <Modal
              title={'Заказ'}
              onClose={() => {
                dispatch(closeModal());
              }}
            >
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ModalRouter;
