import { Reducer } from "react";
import { IUserData } from './actions';
import {
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS,
  MeRequestAction,
  MeRequestErrorAction,
  MeRequestSuccessAction,
} from "./actions";

// Редьюсер для обработки состояния данных пользователя
// Тип состояния данных пользователя
export type MeState = {
  loading: boolean;
  error: string;
  data: IUserData;
};

// Типы действий, связанных с данными пользователя
type MeActions =
  | MeRequestAction
  | MeRequestSuccessAction
  | MeRequestErrorAction;
// Редьюсер для данных пользователя
export const meReducer: Reducer<MeState, MeActions> = (state, action) => {
  switch (action.type) {
    case ME_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ME_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    case ME_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    default:
      return state;
  }
};
