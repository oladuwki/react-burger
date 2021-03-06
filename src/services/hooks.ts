import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { AppDispatch, RootState, AppThunk } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useAppDispatch = () => dispatchHook<AppDispatch | AppThunk>();
