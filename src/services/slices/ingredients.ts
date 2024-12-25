import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient
} from '@utils-types';

export interface IngredientsState {
  ingredients: TIngredient[];
  constructorItems: TConstructorItems;
  loading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== ingredientIndex
        );
    },
    moveIngredientDown(state, action: PayloadAction<TIngredient>) {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index >= 0 && index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = temp;
      }
    },
    moveIngredientUp(state, action: PayloadAction<TIngredient>) {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index > 0) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = temp;
      }
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectOrderIngredients: (state) => state.constructorItems,
    selectIngredientCount: (state, ingredientId) => {
      const len = state.constructorItems.ingredients.filter(
        (item) => item._id === ingredientId
      ).length;

      return len == 0
        ? state.constructorItems.bun?._id === ingredientId
          ? 2
          : 0
        : len;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  clearConstructor
} = ingredientsSlice.actions;
export const {
  selectIngredients,
  selectLoading,
  selectOrderIngredients,
  selectIngredientCount
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
