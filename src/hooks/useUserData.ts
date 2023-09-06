import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { IUserData, meRequestAsync } from "../store/me/actions";

// Хук для получения данных пользователя
export function useUserData() {
  // Использование хуков useSelector и useDispatch для работы с Redux
  const data = useSelector<RootState, IUserData>((state) => state.me.data);
  const loading = useSelector<RootState, boolean>((state) => state.me.loading);

  const token = useSelector<RootState>((state) => state.token);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    // При изменении токена выполняется запрос данных пользователя
    if (token && token !== "undefined") {
      dispatch(meRequestAsync());
    } else {
      return;
    }
  }, [token]);

  // Возвращение полученных данных и состояния загрузки
  return {
    data,
    loading,
  };
}
