import React, { Suspense, lazy, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { GlobalStyle } from './globalStyle';

// split coding (chunks)
const Home = lazy(() => import('pages/Home/Home'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Suspense fallback={<LinearProgress />}>
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'*'} component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Fragment>
  );
};

export default App;
