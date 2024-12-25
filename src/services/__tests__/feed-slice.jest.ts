import feedReducer, { fetchFeed } from '../slices/feed';

const mockOrders = [
  { id: '1', name: 'Order 1' },
  { id: '2', name: 'Order 2' }
];
const mockPayload = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};

const initialState = {
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0
};

describe('feedSlice reducer tests', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should set loading to true when fetchFeed is pending', () => {
    const action = { type: fetchFeed.pending.type };
    const result = feedReducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  it('should set loading to false when fetchFeed is rejected', () => {
    const action = { type: fetchFeed.rejected.type };
    const result = feedReducer(initialState, action);
    expect(result.loading).toBe(false);
  });

  it('should set loading to false and update orders, total, and totalToday when fetchFeed is fulfilled', () => {
    const action = { type: fetchFeed.fulfilled.type, payload: mockPayload };
    const result = feedReducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.orders).toEqual(mockOrders);
    expect(result.total).toBe(100);
    expect(result.totalToday).toBe(10);
  });
});
