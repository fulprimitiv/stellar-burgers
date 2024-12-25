import ingredientsReducer, {
  addIngredient,
  removeIngredient,
  fetchIngredients,
  initialState,
  moveIngredientDown,
  clearConstructor
} from '../slices/ingredients';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mockIngredient1: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockIngredient2: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    constructorItems: {
      bun: null,
      ingredients: []
    },
    loading: false,
    error: null
  };

  it('должен вернуть начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  it('очищает конструктор при вызове clearConstructor', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: mockBun,
        ingredients: [mockIngredient1]
      }
    };
    const action = clearConstructor();
    const result = ingredientsReducer(initialStateWithIngredients, action);
    expect(result.constructorItems).toEqual({ bun: null, ingredients: [] });
  });

  describe('async actions', () => {
    it('должен установить loading в true при fetchIngredients.pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const newState = ingredientsReducer(initialState, action);
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обновить ingredients при fetchIngredients.fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: [
          { _id: '1', name: 'Булка' },
          { _id: '2', name: 'Соус' }
        ]
      };
      const newState = ingredientsReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.ingredients).toEqual([
        { _id: '1', name: 'Булка' },
        { _id: '2', name: 'Соус' }
      ]);
    });

    it('должен установить ошибку при fetchIngredients.rejected', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        payload: 'Ошибка загрузки ингредиентов'
      };
      const newState = ingredientsReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Ошибка загрузки ингредиентов');
    });
  });
});

describe('ingredientsSlice - addIngredient', () => {
  it('добавляет булку, если тип ингредиента bun', () => {
    const action = addIngredient(mockBun);
    const result = ingredientsReducer(initialState, action);
    expect(result.constructorItems.bun).toEqual(mockBun);
  });

  it('добавляет ингредиент в массив, если тип не bun', () => {
    const action = addIngredient(mockIngredient1);
    const result = ingredientsReducer(initialState, action);
    expect(result.constructorItems.ingredients).toContainEqual(mockIngredient1);
  });
});

// Тесты для removeIngredient
describe('ingredientsSlice - removeIngredient', () => {
  it('удаляет ингредиент из массива', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: { ...mockBun, id: '1' },
        ingredients: [
          { ...mockIngredient1, id: '2' },
          { ...mockIngredient2, id: '3' }
        ]
      }
    };

    const action = removeIngredient(
      initialStateWithIngredients.constructorItems.ingredients[0]
    );
    const result = ingredientsReducer(initialStateWithIngredients, action);
    expect(result.constructorItems.ingredients).not.toContainEqual(
      mockIngredient1
    );
  });
});

// Тесты для moveIngredientDown
describe('ingredientsSlice - moveIngredientDown', () => {
  it('перемещает ингредиент вниз по списку', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient1, mockIngredient2]
      }
    };
    const action = moveIngredientDown(mockIngredient1);
    const result = ingredientsReducer(initialStateWithIngredients, action);
    expect(result.constructorItems.ingredients).toEqual([
      mockIngredient2,
      mockIngredient1
    ]);
  });

  it('не изменяет порядок, если ингредиент находится внизу списка', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient1, mockIngredient2]
      }
    };
    const action = moveIngredientDown(mockIngredient2);
    const result = ingredientsReducer(initialStateWithIngredients, action);
    expect(result.constructorItems.ingredients).toEqual([
      mockIngredient1,
      mockIngredient2
    ]);
  });
});

// Тесты для редьюсера
describe('ingredientsSlice - reducer', () => {});
