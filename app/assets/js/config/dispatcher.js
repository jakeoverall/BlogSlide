var FluxDispatcher = require('flux').Dispatcher,
    Dispatcher = new FluxDispatcher();

Dispatcher.handleAction = function (action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

module.exports = Dispatcher;