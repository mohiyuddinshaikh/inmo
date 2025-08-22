import { configureStore } from '@reduxjs/toolkit';
import { useStore, useSelector, shallowEqual } from 'react-redux';
import userReducer from './userSlice';

// Create the store
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Create a hook for using the store in server components
export const useAppSelector = (selector) => {
  const store = useStore();
  return useSelector(selector, shallowEqual);
};

export default store;
