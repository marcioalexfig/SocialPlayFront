/*Basics*/
import React from 'react';
import { render } from 'react-dom';
/*Libs*/
import { Router, Route, hashHistory } from 'react-router'


/*Pages*/
import Index from './template/index';
import Tumblr from './template/modules/tumblr/index';
import XVideos from './template/modules/xvideos/index';
import { Provider } from 'react-redux';
import store from './store';
import Instagram from './template/modules/instagram/index'

//Login
import Login from './login/index';

//Sair
//import Sair from './modules/sair';

//console.log(process.env);

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index}>

        <Route path="/instagram" component={Instagram} />
        <Route path="/tumblr" component={Tumblr} />
        <Route path="/xvideos" component={XVideos} />
        <Route path="/login" component={Login} />
      </Route>

    </Router>
  </Provider>
), document.getElementById('app'));
