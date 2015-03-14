var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link,
    db = require('../../config/db-connect'),
    store = require('../../stores/DbStore');

var FluidContainer = React.createClass({
    getInitialState: function(){
        return {
            loggedIn: db.actions.isLoggedIn(),
            user: db.actions.getUser()
        }
    },
    _onChange: function(){
        this.setState({
            loggedIn: store.getState().cache.authData
        })
    },
    componentDidMount: function(){
        store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        store.removeChangeListener(this._onChange)
    },
    handleLogout: function(){
        db.actions.logout();
    },
    render: function() {
        var loginOrOut;
        var register;
        if(this.state.loggedIn){
            loginOrOut = <li><a href="" className="navbar-brand" onClick={this.handleLogout}>Logout</a></li>;
            register = '';
        } else {
            loginOrOut = <li><Link to="login" className="navbar-brand">Login</Link></li>;
            register = <li><Link to="register" className="navbar-brand"> Register </Link></li>;
        }
        return (
            <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to="home" className="navbar-brand">BlogSlide</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="home" className="navbar-brand"> Home </Link></li>
                {loginOrOut}
                {register}
            </ul>
            </div>
            </div>
        )
    }        
});

var FixedTop = React.createClass({
    render: function(){
        return (
        <div>
        <nav className="header navbar navbar-transparent navbar-fixed-top">
            <FluidContainer />  
        </nav>
        <div className="container">
        <div className="row">
            <RouteHandler />
        </div></div></div>
      )
  }
});

module.exports = FixedTop;