import modalReducer, { openModal, closeModal } from '../slices/modal';

describe('modalSlice', () => {
  const initialState = {
    isModalOpened: false
  };

  it('должен вернуть начальное состояние', () => {
    expect(modalReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('reducers', () => {
    it('должен открыть модальное окно при openModal', () => {
      const newState = modalReducer(initialState, openModal());
      expect(newState.isModalOpened).toBe(true);
    });

    it('должен закрыть модальное окно при closeModal', () => {
      const openedState = { isModalOpened: true };
      const newState = modalReducer(openedState, closeModal());
      expect(newState.isModalOpened).toBe(false);
    });
  });
});
