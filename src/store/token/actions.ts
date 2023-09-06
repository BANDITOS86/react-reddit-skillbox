import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, setToken } from "../reducer";

// Типы действий
export const SET_TOKEN = 'SET_TOKEN';

// Тип действия для установки токена
export type SetTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
};

// Асинхронное действие для сохранения токена
export const saveToken =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    // Получение токена из глобальной переменной или localStorage
    const token = window.__token__ || localStorage.getItem('token');
    if (token) {
      // Диспатч действия установки токена и сохранение его в localStorage
      dispatch(setToken(token));
      localStorage.setItem('token', token);
    }
  };