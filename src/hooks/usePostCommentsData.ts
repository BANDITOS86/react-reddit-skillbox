// Ваш файл usePostCommentsData.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPostCommentProps } from '../shared/Post/PostComment';
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';

interface IUsePostCommentsData {
  postId: string;
  subreddit: string;
}

type ICommentsData = Array<IPostCommentProps>;

export function usePostCommentsData({
  postId,
  subreddit,
}: IUsePostCommentsData) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ICommentsData>([]);

  const token = useSelector((state: RootState) => state.token);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://api.reddit.com/r/${subreddit}/comments/${postId}`)
        .then((resp: any) => {
          const commentsData = resp.data[1];

          function getCommentResultData(respObj: any): ICommentsData {
            const result: ICommentsData = [];
            respObj.data.children.forEach(
              ({
                data: { id, author, replies, score, created, body },
              }: any) => {
                const resultItem: IPostCommentProps = {
                  commentId: id,
                  author: author,
                  replies: [],
                  score: `${score}`,
                  created: created,
                  body: body,
                };

                if (replies) {
                  resultItem.replies = getCommentResultData(replies);
                }

                result.push(resultItem);
              }
            );

            return result;
          }

          const commentsResultData: ICommentsData =
            getCommentResultData(commentsData);

          setIsLoading(false);
          setData(commentsResultData);
        })
        .catch(console.log);
    }
  }, [token, postId, subreddit]);

  return { isLoading, data };
}
