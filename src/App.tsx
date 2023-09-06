import React, { useEffect, useState } from "react";
import "./main.global.css";
import { hot } from "react-hot-loader/root";
import { Layout } from "./shared/Layout";
import { Header } from "./shared/Header";
import { Content } from "./shared/Content";
import { CardsList } from "./shared/CardsList";
import { useToken } from "./hooks/useToken";
import { PostsContextProvider } from "./shared/context/postsContext";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./store/reducer";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Post } from "./shared/Post";

// Создание хранилища Redux с применением middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function AppComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Использование хука для обработки токена
  useToken();

  return (
    <>
      {mounted && (
        <BrowserRouter>
          <PostsContextProvider>
            <Layout>
              <Header />
              <Content>
                <Switch>
                  {/* Редирект с /auth и / на /posts */}

                  <Route exact path="/auth">
                    <Redirect to="/posts" />
                  </Route>

                  <Route exact path="/">
                    <Redirect to="/posts" />
                  </Route>

                  <Route path="/posts" >
                    <CardsList />

                    <Switch>
                      <Route path="/posts/:subreddit/:id">
                        <Post />
                      </Route>
                    </Switch>
                  </Route>

                  {/* Сообщение "404 — страница не найдена" для всех остальных маршрутов */}

                  <Route path="*">
                    <div>404 — страница не найдена</div>
                  </Route>
                </Switch>
              </Content>
            </Layout>
          </PostsContextProvider>
        </BrowserRouter>
      )}
    </>
  );
}

// Обертка для горячей замены модулей
export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));
