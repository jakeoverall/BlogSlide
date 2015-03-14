var Firebase = require('./modules').Firebase,
    root = 'https://blogslide.firebaseio.com/',
    db = db || new Firebase(root);
db.rootUrl = root;
var lessonRef = window.localStorage.getItem('lessonRef');
var lesson;
if(lessonRef){
    lesson = new Firebase(lessonRef)
}

db._cache = db._cache || {
    authData: db.getAuth(),
    lessonRef: lessonRef,
    lesson: lesson
};
db.actions = db.actions || {};

module.exports = db;