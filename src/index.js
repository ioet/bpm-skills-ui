/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import 'typeface-roboto';
import App from './App';
import rootReducer from './RootReducer';
import { getAllSkills } from './component/skills/SkillActions';
import RootTheme from './AppStyles';
import { getAllCategories } from './component/categories/CategoryActions';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware),
  ),
);

store.dispatch(getAllCategories());
store.dispatch(getAllSkills());

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={RootTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
});
