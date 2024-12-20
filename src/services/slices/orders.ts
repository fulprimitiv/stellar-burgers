import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface IngredientsState {
  loading: boolean;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  userOrders: TOrder[] | null;
}

const initialState: IngredientsState = {
  loading: false,
  orderModalData: null,
  orderRequest: false,
  userOrders: null
};

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchUserOrders = createAsyncThunk('orders/userOrders', async () =>
  getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    },
    removeUserOrders(state) {
      state.userOrders = null;
    }
  },
  selectors: {
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { closeOrderRequest, removeUserOrders } = ordersSlice.actions;
export const { selectOrderModalData, selectOrderRequest, selectUserOrders } =
  ordersSlice.selectors;

export default ordersSlice.reducer;
