import { Action, ActionCreator } from "redux";
import { RootState } from "../reducer";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

// Действия для запроса данных пользователя
export const ME_REQUEST = "ME_REQUEST";
export type MeRequestAction = {
  type: typeof ME_REQUEST;
};
export const meRequest: ActionCreator<MeRequestAction> = () => ({
  type: ME_REQUEST,
});

// Интерфейс данных пользователя
export interface IUserData {
  name?: string;
  iconImg?: string;
}
// Действие для успешного получения данных пользователя
export const ME_REQUEST_SUCCESS = "ME_REQUEST_SUCCESS";
export type MeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS;
  data: IUserData;
};
export const meRequestSuccess: ActionCreator<MeRequestSuccessAction> = (
  data: IUserData
) => ({
  type: ME_REQUEST_SUCCESS,
  data,
});

// Действие при ошибке получения данных пользователя
export const ME_REQUEST_ERROR = "ME_REQUEST_ERROR";
export type MeRequestErrorAction = {
  type: typeof ME_REQUEST_ERROR;
  error: string;
};
export const meRequestError: ActionCreator<MeRequestErrorAction> = (
  error: string
) => ({
  type: ME_REQUEST_ERROR,
  error,
});

// Асинхронное действие для получения данных пользователя через API
export const meRequestAsync =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(meRequest());

    axios
      .get("https://oauth.reddit.com/api/v1/me", {
        headers: { Authorization: `bearer ${getState().token}` },
      })
      .then((resp) => {
        const userData = resp.data;

        dispatch(
          meRequestSuccess({ name: userData.name, iconImg: userData.icon_img })
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(meRequestError(String(error)));
      });
  };
