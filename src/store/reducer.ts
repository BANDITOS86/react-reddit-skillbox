import { ActionCreator, Reducer } from "redux";
import {
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS,
  MeRequestAction,
  MeRequestErrorAction,
  MeRequestSuccessAction,
} from "./me/actions";
import { MeState, meReducer } from "./me/reducer";
import { tokenReducer } from "./token/reducer";

// Объединение редьюсеров и экшенов для пользовательских данных
// Объединение типов состояния приложения
export type RootState = {
  commentText: string;
  token: string;
  me: MeState;
};

// Действие для обновления текста комментария
const UPDATE_COMMENT = "UPDATE_COMMENT";
type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  text: string;
};
export const updateComment: ActionCreator<UpdateCommentAction> = (
  text: string
) => ({
  type: UPDATE_COMMENT,
  text,
});

// Действие и редьюсер для токена
const SET_TOKEN = "SET_TOKEN";
type SetTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
};
// Действие для установки токена
export const setToken: ActionCreator<SetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token,
});

// Начальное состояние приложения
const initialState: RootState = {
  commentText: "Привет, Skillbox!",
  token: "",
  me: {
    loading: false,
    error: '',
    data: {}
  },
};

// Объединение всех действий в общий тип действия
type MyAction = UpdateCommentAction
  | SetTokenAction
  | MeRequestAction
  | MeRequestSuccessAction
  | MeRequestErrorAction;
// Главный редьюсер, объединяющий все редьюсеры и обрабатывающий действия
export const rootReducer: Reducer<RootState, MyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // Обработка действия обновления текста комментария
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
     // Обработка действия установки токена
    case SET_TOKEN:
      return {
        ...state,
        token: tokenReducer(state.token, action),
      };
    // Обработка действий для запросов пользователя
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action),
      };
    default:
      return state;
  }
};
