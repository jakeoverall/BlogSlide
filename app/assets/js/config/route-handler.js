var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var components = require('../components/main');

var routes = (
  <Route path="/" name="home" handler={components.navs.fixedTop} >
    <Route name="login" handler={components.auth.login} />
    <Route name="register" handler={components.auth.register} />
    <Route name="dashboard" handler={components.dashboard.main} />
    <Route name="lesson" path="/lesson/:id" handler={components.lessons.lesson} />
  </Route>
);

module.exports = routes;