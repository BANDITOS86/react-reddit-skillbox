import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveToken } from "../store/token/actions";

// Хук для обработки токена
export function useToken() {
  const dispatch = useDispatch<any>();

  // При загрузке компонента выполняется действие сохранения токена
  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);
}