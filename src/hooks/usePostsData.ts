import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../shared/context/tokenContext";
import axios from "axios";
import { ICardProps } from "../shared/CardsList/Card";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";

// Определение пользовательских типов данных
interface IPostData extends ICardProps {} // Интерфейс данных для одного поста, расширяющий интерфейс ICardProps
interface IPostsData extends Array<IPostData> {} // Интерфейс данных для массива постов

// Основная функция хука, возвращающая данные о постах
export function usePostsData() {
  // Создание состояний с помощью хука useState
  const [data, setData] = useState<IPostsData>([]); // Указываем правильный тип для data
  const [isMounted, setIsMounted] = useState(true);
  // Получение значения токена пользователя из контекста с помощью хука useContext
  const token = useSelector((state: RootState) => state.token);
  // console.log(token);

  // Эффект, который выполняется при монтировании компонента и при изменении значения токена
  useEffect(() => {
    setIsMounted(true); // Установка флага isMounted в true при монтировании компонента

    if (!token) {
      setData([]); // Если пользователь не аутентифицирован, устанавливаем пустой список данных
      return;
    }

    if (token && token !== "undefined") {
      // Выполнение HTTP-запроса к Reddit API с использованием библиотеки axios
      axios
        .get("https://oauth.reddit.com/best.json?sr_detail=true", {
          headers: { Authorization: `bearer ${token}` }, // Передача токена в заголовке запроса
        })
        .then((resp) => {
          // Обработка успешного ответа
          if (isMounted) {
            // Проверка, что компонент всё ещё смонтирован
            const postsData = resp.data.data.children; // Извлечение данных о постах из ответа
            // console.log(postsData);
            const postsResultsData: IPostsData = []; // Создание массива для новых данных о постах

            // Проход по каждому посту и формирование нового объекта с необходимыми данными
            postsData.forEach(
              ({
                data: {
                  id,
                  author,
                  title,
                  score,
                  subreddit,
                  sr_detail,
                  thumbnail,
                  preview,
                },
              }: any) => {
                postsResultsData.push({
                  id: id,
                  title: title,
                  username: author,
                  score: score,
                  subreddit: subreddit,
                  avatarSrc: sr_detail.icon_img ?? null,
                  // previewSrc: preview?.enabled ? preview?.images?.[0]?.source?.url ?? null : null,
                  // previewSrc: preview?.images?.[0]?.source?.url ?? null,
                  previewSrc:
                    (thumbnail.endsWith(".jpg") ||
                      thumbnail.endsWith(".png")) &&
                    thumbnail !== "default" &&
                    thumbnail !== "self"
                      ? thumbnail
                      : null,
                });
              }
            );
            // console.log(postsResultsData);
            setData(postsResultsData); // Установка новых данных о постах
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData([]); // В случае ошибки установиться пустой список данных
        });
    }

    // Возвращаемая функция выполняется при размонтировании компонента
    return () => {
      setIsMounted(false); // Установка флага isMounted в false при размонтировании компонента
    };
  }, [token]); // Зависимость от значения токена

  // Возвращение данных о постах из хука
  return [data];
}
