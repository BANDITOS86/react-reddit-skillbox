// Ваш файл Post.tsx

import React, { useEffect, useRef } from "react";
import styles from "./post.css";
import ReactDOM from "react-dom";
import { PostComment } from "./PostComment";
import { usePostCommentsData } from "../../hooks/usePostCommentsData";
import { CommentFormContainer } from "../CommentFormContainer";
import { useHistory, useParams } from "react-router-dom";

export function Post() {
  const { id, subreddit } = useParams<{ id: string; subreddit: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const node = document.querySelector("#modal_root");
  if (!node) return null;

  const { isLoading, data: commentsData } = usePostCommentsData({
    postId: id,
    subreddit: subreddit,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;

      if (event.target instanceof Node && !ref.current.contains(event.target)) {
        history.push("/posts");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [history]);

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      <h2>
        Следует отметить, что новая модель организационной деятельности поможет
      </h2>

      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          est nesciunt similique veritatis hic molestias rerum quisquam vel quam
          deleniti harum nisi, sequi quae quia facere dolores obcaecati libero
          dolorum blanditiis! Non cupiditate impedit deserunt!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
          eveniet ut nulla possimus optio, quis labore sed vitae doloribus
          ratione eius. Cum expedita fuga iure omnis in, quasi voluptate
          assumenda laborum. Mollitia vero eaque enim.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ipsum
          facilis laudantium at sint error nesciunt debitis doloremque ipsa, id
          explicabo quas dolore perferendis rem iure quisquam asperiores
          necessitatibus nobis. Porro quae vitae corporis at.
        </p>
      </div>

      <CommentFormContainer />

      <div className={styles.commentsContainer}>
        {isLoading ? (
          <div className={styles.text}>
            Reddit...
            <span className={styles.preloader}></span>
          </div>
        ) : commentsData.length === 0 ? (
          <p>Комментарии отсутствуют</p>
        ) : (
          commentsData.map((commentData) => (
            <PostComment key={commentData.commentId} {...commentData} />
          ))
        )}
      </div>
    </div>,
    node
  );
}
