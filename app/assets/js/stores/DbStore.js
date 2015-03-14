var AppDispatcher = require('../config/dispatcher'),
    db = require('../config/db-connect'),
    objectAssign = require('react/lib/Object.assign'),
    EventEmitter = require('events').EventEmitter,
    Firebase = require('firebase');

var CHANGE_EVENT = 'change';

var _state = {
    cache: {
        
    },
};

var userChange = function () {
    _state.cache.user = db._cache.user;
}
var setLesson = function (lessonId) {
    db._cache.lessonRef = db.rootUrl + 'users/' + db._cache.authData.fbid + '/lessons/' + lessonId + '/slides/';
    db._cache.lesson = new Firebase(db._cache.lessonRef);
    window.localStorage.setItem('lessonRef', db._cache.lessonRef);
}

var store = objectAssign({}, EventEmitter.prototype, {
    getState: function () {
        return _state;
    },
    addChangeListener: function (cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function (cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case 'USER_UPDATE':
            userChange(action.data);
            store.emit(CHANGE_EVENT);
            break;
        case 'SET_LESSON':
            setLesson(action.data);
            store.emit(CHANGE_EVENT);
            break;
        default:
            return true
    };
    return true;
});

module.exports = store;