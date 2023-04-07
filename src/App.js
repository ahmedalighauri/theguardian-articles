import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
const Footer = lazy(() => import("./components/Footer"));
const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  const [loading, setLoading] = useState(false);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header setLoading={setLoading} />
        {
          loading && (
            <div className="loader">
              <img src="/loading.png" alt="Loading"/>
            </div>
          )
        }
        {
          !loading &&
          <Switch>
            <Route exact path="/">
              <Suspense
                fallback={
                  <div className="loader">
                    <img src="/loading.png" alt="Loading"/>
                  </div>
                }
              >
                <Home />
              </Suspense>
            </Route>
            <Route path="/article/:id">
              <Suspense
                fallback={
                  <div className="loader">
                    <img src="/loading.png" alt="Loading"/>
                  </div>
                }
              >
                <Article />
              </Suspense>
            </Route>
            <Route path="/search/:query">
              <Suspense
                fallback={
                  <div className="loader">
                    <img src="/loading.png" alt="Loading"/>
                  </div>
                }
              >
                <Search />
              </Suspense>
            </Route>
          </Switch>
        }
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
