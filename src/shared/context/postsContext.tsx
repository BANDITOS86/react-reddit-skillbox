import React from "react";
import { usePostsData } from "../../hooks/usePostsData";
import { ICardProps } from "../CardsList/Card";

// Определение интерфейса для массива данных о постах
interface IPostsData extends Array<ICardProps> {}

// Создание контекста для данных о постах
export const postsContext = React.createContext<IPostsData>([]);

// Компонент-провайдер контекста для данных о постах
export function PostsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Использование хука usePostsData для получения данных о постах
  const [data] = usePostsData();

  // Возвращение компонента с контекстом, в котором передаются полученные данные о постах
  return <postsContext.Provider value={data}>{children}</postsContext.Provider>;
}
