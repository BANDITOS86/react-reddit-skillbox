import React, { useEffect, useRef, useState } from "react";
import styles from "./cardslist.css";
import { Card } from "./Card/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

export function CardsList() {
  // Получаем токен из Redux состояния
  const token = useSelector<RootState>((state) => state.token);

  // Состояния для хранения постов, статуса загрузки и ошибки
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState("");

  // Состояния для управления подгрузкой постов и кнопкой "Загрузить ещё"
  const [nextAfter, setNextAfter] = useState("");
  const [nextLoadingNumber, setNextLoadingNumber] = useState(1);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
  // Количество подгрузок перед появлением кнопки "Загрузить ещё"
  const SHOW_LOAD_BUTTON_NUMBER = 3;

  // Ссылка на нижний конец списка
  const bottomOfList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверка, нужно ли выполнять подгрузку
    if (
      !token ||
      token === "undefined" ||
       (!hasLoadedInitially && !bottomOfList.current) ||
      nextLoadingNumber % SHOW_LOAD_BUTTON_NUMBER === 0
    )
      return;

    // Функция для загрузки данных
    async function load() {
      setLoading(true);
      setErrorLoading("");

      try {
        // Запрос к API для получения данных
        const {
          data: {
            data: { after, children },
          },
        } = await axios.get(
          "https://oauth.reddit.com/rising.json?sr_detail=true/",
          {
            headers: { Authorization: `bearer ${token}` },
            params: {
              limit: 10,
              after: nextAfter,
            },
          }
        );

        // console.log({ data: { data: { after, children } } });

        // Обновление состояний для отображения постов
        setNextAfter(after);
        setPosts((prevChildren) => prevChildren.concat(...children));
        setNextLoadingNumber(nextLoadingNumber + 1);
         setLoading(false);
      } catch (error) {
        setErrorLoading(String(error));
      }

      setLoading(false);
    }

    // Создание наблюдателя IntersectionObserver для отслеживания нижнего конца списка
    const observer = new IntersectionObserver(
      (entries) => {
        // Если компонент монтируется и обнаруживает, что IntersectionObserver уже видит конец списка, установите флаг hasLoadedInitially в true.
        if (!hasLoadedInitially && entries[0].isIntersecting) {
          setHasLoadedInitially(true);
        }

        // Проверка, видим ли нижний конец списка и не третья ли подгрузка
        if (hasLoadedInitially && entries[0].isIntersecting) {
          // Вызов функции загрузки
          load();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (bottomOfList.current) {
      // Начало наблюдения за нижним концом списка
      observer.observe(bottomOfList.current);
    }

    // Отписка от наблюдения при размонтировании компонента
    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current);
      }
    };
  }, [
    bottomOfList.current,
    nextAfter,
    token,
    nextLoadingNumber,
  ]);

  // Обработчик клика на кнопку "Загрузить ещё"
  function handleLoadMoreClick() {
    // Начало загрузки и увеличение счетчика подгрузок
    setLoading(true);
    setNextLoadingNumber(nextLoadingNumber + 1);
  }

  return (
    <div className={styles.posts__wrapper}>
      <ul className={styles.cardsList}>
        {/* Отображение сообщения, если нет постов */}
        {posts.length === 0 && !loading && !errorLoading && (
          <div className={styles.no__posts}>Нет ни одного поста</div>
        )}

        {/* Отображение списка постов */}
        {posts.map(
          (
            {
              data: {
                id,
                subreddit,
                userUrl,
                author,
                published,
                title,
                score,
                sr_detail,
                thumbnail,
              },
            },
            index
          ) => (
            <Card
              key={index} // Используем индекс в качестве ключа
              id={id}
              subreddit={subreddit}
              userUrl={userUrl}
              username={author}
              published={published}
              title={title}
              score={score}
              avatarSrc={sr_detail?.icon_img ?? null}
              previewSrc={
                (thumbnail.endsWith(".jpg") || thumbnail.endsWith(".png")) &&
                thumbnail !== "default" &&
                thumbnail !== "self"
                  ? thumbnail
                  : null
              }
            />
          )
        )}

        {/* Элемент для отслеживания нижнего конца списка */}
        <div ref={bottomOfList} />

        {/* Отображение статуса загрузки */}
        {loading && (
          <div className={styles.text}>
            Reddit...
            <span className={styles.preloader}></span>
          </div>
        )}

        {/* Отображение ошибки */}
        {errorLoading && (
          <div role="alert" style={{ textAlign: "center" }}>
            {errorLoading}
          </div>
        )}
      </ul>

      {/* Отображение кнопки "Загрузить ещё" */}
      {nextLoadingNumber % SHOW_LOAD_BUTTON_NUMBER === 0 &&
        !loading &&
        !errorLoading && (
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMoreClick}
          >
            Загрузить ещё
          </button>
        )}
    </div>
  );
}
