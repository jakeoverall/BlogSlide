var db = require('../config/db-connect'),
    dispatcher = require('../config/dispatcher');

var _emitChange = function (change, data) {
    dispatcher.handleAction({
        actionType: change,
        data: data
    });
}

db.actions.addLesson = function (lesson) {
    _emitChange("LESSONS_UPDATE", db._cache.lessons.push(lesson));
}

db.actions.setLesson = function (lessonId) {
    _emitChange("SET_LESSON", lessonId);
}

db.actions.addSlide = function (slide) {
    _emitChange("LESSONS_UPDATE", db._cache.lesson.push(slide));
}

db.actions.validateAuth = function (cb) {
    if (db._cache.authData) {
        db.authWithCustomToken(db._cache.authData.token, function (err, authData) {
            if (err) {
                return err;
            }
            return authData;
        });
    } else {
        return false;
    }
}

db.actions.getUser = function () {
    if (db._cache.authData) {
        var authData = db._cache.authData;
        authData.fbid = authData.uid.substr(12);
        var userRef = db.rootUrl + 'users/' + authData.fbid;
        var lessonsRef = db.rootUrl + 'users/' + authData.fbid + '/lessons';
        var userSync = new Firebase(userRef);
        var lessonsSync = new Firebase(lessonsRef);
        db._cache.authData = authData;
        db._cache.lessons = lessonsSync;
        db._cache.user = userSync;
        _emitChange("USER_UPDATE", db.actions.validateAuth());
    }
}
db.actions.logout = function () {
    _emitChange("USER_UPDATE", db.unauth());
}
db.actions.userLogin = function (user, cb, error) {
    if (!error) {
        db.authWithPassword({
            email: user.email,
            password: user.password
        }, function (err, authData) {
            if (authData) {
                if (user.name) {
                    authData.name = user.name;
                }
                authData.fbid = authData.uid.substr(12);
                var userRef = db.rootUrl + 'users/' + authData.fbid;
                var lessonsRef = db.rootUrl + 'users/' + authData.fbid + '/lessons';
                var userSync = new Firebase(userRef);
                var lessonsSync = new Firebase(lessonsRef);
                db._cache.authData = authData;
                db._cache.lessons = lessonsSync;
                db._cache.user = userSync;
                cb(userSync);
            } else {
                console.log('something went wrong', err);
            }
            _emitChange("USER_UPDATE", db.actions.validateAuth(authData));
        });
    } else {
        console.log("Error creating user:", error);
        cb(false);
        _emitChange("USER_UPDATE", db.actions.validateAuth(authData));
    }
}

db.actions.registerUser = function (user, cb) {
    db.createUser({
        email: user.email,
        password: user.password
    }, function (err) {
        db.authWithPassword({
            email: user.email,
            password: user.password
        }, function (err, authData) {
            if (!authData) {
                return console.log(err);
            }
            authData.fbid = authData.uid.substr(12);
            db.child('users').child(authData.fbid).set(authData);
            db.actions.userLogin(user, cb, err);
        });
    });
};

db.actions.isLoggedIn = function () {
    if (db._cache.authData) { return true; }
    return false;
}

db.actions.toArray = function (fbObj) {
    var arr = [];
    for (var key in fbObj) {
        arr.push(fbObj[key]);
    }
    _emitChange("LESSONS_UPDATE", arr);
    return arr;
}