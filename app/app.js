var BlogSlide = require('./assets/js/config/namespace'),
    modules = BlogSlide.modules,
    routes = BlogSlide.routes;

var Styles = {
    bootstrap: require('bootstrap/dist/css/bootstrap.css'),
    fontAwesome: require('font-awesome/css/font-awesome.css'),
    style: require('./assets/css/style.css'),
    styleResponsive: require('./assets/css/style-responsive.css'),
    animate: require('./assets/css/animate.css'),
    theme: require('./assets/css/blog-slide-theme.css')
}

modules.Router.run(routes, function(Handler){
    modules.React.render(modules.React.createElement(Handler,null), document.getElementById('app'));
});