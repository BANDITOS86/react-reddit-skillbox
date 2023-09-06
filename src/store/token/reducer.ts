import { Reducer } from "react";
import { SET_TOKEN, SetTokenAction } from "./actions";

export type TokenState = string;

export type TokenActions = SetTokenAction;

// Редьюсер для обработки токена
export const tokenReducer: Reducer<TokenState, TokenActions> = (
  state,
  action
) => {
  switch (action.type) {
    // Обработка действия SET_TOKEN
    case SET_TOKEN:
      // Возвращается новое значение токена
      return action.token;
    default:
      return state;
  }
};