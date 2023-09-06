import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { IPostCommentProps } from '../shared/Post/PostComment';
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';

// Определение интерфейса для свойств хука
interface IUsePostCommentsData {
  postId: string;
  subreddit: string;
}

// Определение типа для массива данных комментариев
type ICommentsData = Array<IPostCommentProps>;

// Определение хука usePostCommentsData
export function usePostCommentsData({
  postId,
  subreddit,
}: IUsePostCommentsData) {
  // Использование хука useState для хранения данных комментариев
  const [data, setData] = useState<ICommentsData>([]);
  // Использование useContext для получения токена из контекста
  const token = useSelector((state: RootState) => state.token);

  // Эффект, выполняющийся при изменении токена, postId или subreddit
  useEffect(() => {
    // Проверка наличия токена
    if (token) {
      // Выполнение GET-запроса к Reddit API для получения данных комментариев
      axios
        .get(`http://api.reddit.com/r/${subreddit}/comments/${postId}`)
        .then((resp: any) => {
          // Получение данных комментариев из ответа
          const commentsData = resp.data[1]; 

          // Рекурсивная функция для обработки и структурирования данных комментариев
          function getCommentResultData(respObj: any): ICommentsData {
            const result: ICommentsData = [];
            respObj.data.children.forEach(
              ({
                data: { id, author, replies, score, created, body },
              }: any) => {
                // Формирование объекта для каждого комментария
                const resultItem: IPostCommentProps = {
                  commentId: id,
                  author: author,
                  replies: [], // По умолчанию пустой массив для ответов на комментарий
                  score: `${score}`,
                  created: created,
                  body: body,
                };

                // Рекурсивное получение ответов на комментарий, если они есть
                if (replies) {
                  resultItem.replies = getCommentResultData(replies);
                }

                // Добавление объекта комментария в результат
                result.push(resultItem);
              }
            );

            return result;
          }

          // Получение структурированных данных комментариев
          const commentsResultData: ICommentsData =
            getCommentResultData(commentsData);

          // Обновление состояния данных комментариев
          setData(commentsResultData);
        })
        .catch(console.log);
    }
  }, [token, postId, subreddit]); // Зависимости эффекта

  // Возвращение структурированных данных комментариев
  return data;
}
