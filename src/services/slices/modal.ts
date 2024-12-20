import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpened: boolean;
}

const initialState: ModalState = {
  isModalOpened: false
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpened = true;
    },
    closeModal(state) {
      state.isModalOpened = false;
    }
  },
  selectors: {
    selectIsModalOpened: (state) => state.isModalOpened
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export const { selectIsModalOpened } = modalSlice.selectors;

export default modalSlice.reducer;
