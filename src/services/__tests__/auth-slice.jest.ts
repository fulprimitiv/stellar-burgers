import authReducer, {
  removeErrorText,
  fetchLoginUser,
  fetchRegisterUser,
  fetchGetUser,
  fetchUpdateUser,
  fetchLogoutUser
} from '../slices/auth';

const initialState = {
  user: { name: '', email: '' },
  isAuthenticated: false,
  loading: false,
  error: undefined
};

describe('authSlice', () => {
  it('должен вернуть начальное состояние', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен сбросить ошибку при вызове removeErrorText', () => {
    const errorState = {
      ...initialState,
      error: 'Тестовая ошибка'
    };
    const newState = authReducer(errorState, removeErrorText());
    expect(newState.error).toBe('');
  });

  describe('fetchLoginUser thunk', () => {
    it('должен установить loading в true при fetchLoginUser.pending', () => {
      const action = { type: fetchLoginUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(true);
    });

    it('должен установить loading в false и isAuthenticated в true при fetchLoginUser.fulfilled', () => {
      const action = { type: fetchLoginUser.fulfilled.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.isAuthenticated).toBe(true);
    });

    it('должен установить loading в false и записать ошибку при fetchLoginUser.rejected', () => {
      const action = {
        type: fetchLoginUser.rejected.type,
        error: { message: 'Вход не выполнен' }
      };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Вход не выполнен');
    });
  });

  describe('fetchRegisterUser thunk', () => {
    it('должен установить loading в true при fetchRegisterUser.pending', () => {
      const action = { type: fetchRegisterUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(true);
    });

    it('должен установить loading в false и isAuthenticated в true при fetchRegisterUser.fulfilled', () => {
      const action = { type: fetchRegisterUser.fulfilled.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.isAuthenticated).toBe(true);
    });

    it('должен установить loading в false и записать ошибку при fetchRegisterUser.rejected', () => {
      const action = {
        type: fetchRegisterUser.rejected.type,
        error: { message: 'Регистрация не выполнена' }
      };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Регистрация не выполнена');
    });
  });

  describe('fetchGetUser thunk', () => {
    it('должен установить loading в true при fetchGetUser.pending', () => {
      const action = { type: fetchGetUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(true);
    });

    it('должен обновить данные пользователя и isAuthenticated при fetchGetUser.fulfilled', () => {
      const action = {
        type: fetchGetUser.fulfilled.type,
        payload: { user: { name: 'Иван Иванов', email: 'ivan@example.com' } }
      };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual({
        name: 'Иван Иванов',
        email: 'ivan@example.com'
      });
      expect(newState.isAuthenticated).toBe(true);
    });

    it('должен сбросить данные пользователя при fetchGetUser.rejected', () => {
      const action = { type: fetchGetUser.rejected.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual({ name: '', email: '' });
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  describe('fetchLogoutUser thunk', () => {
    it('должен установить loading в true при fetchLogoutUser.pending', () => {
      const action = { type: fetchLogoutUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(true);
    });

    it('должен сбросить данные пользователя и isAuthenticated при fetchLogoutUser.fulfilled', () => {
      const action = {
        type: fetchLogoutUser.fulfilled.type,
        payload: { success: true }
      };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual({ name: '', email: '' });
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  describe('fetchUpdateUser thunk', () => {
    it('должен установить loading в true при fetchUpdateUser.pending', () => {
      const action = { type: fetchUpdateUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(true);
    });

    it('должен установить loading в false и обновить данные пользователя при fetchUpdateUser.fulfilled', () => {
      const action = {
        type: fetchUpdateUser.fulfilled.type,
        payload: {
          success: true,
          user: { name: 'Обновлено', email: 'updated@test.com' }
        }
      };
      const newState = authReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual({
        name: 'Обновлено',
        email: 'updated@test.com'
      });
    });
  });
});
