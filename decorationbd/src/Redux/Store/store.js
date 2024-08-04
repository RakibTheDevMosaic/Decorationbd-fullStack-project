import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../UserAndAuthServices/userAuthApi'
import authReducer from '../AuthAndUserSlice/authSlice';
import userReducer from '../AuthAndUserSlice/userSlice';
import cartReducer from "../CartSlice/cartSlice";
import { cartApi } from '../CartSlice/cartApi';
import { addressApi } from '../AddressSlice/addressApi';
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware,cartApi.middleware,addressApi.middleware),
})

setupListeners(store.dispatch)