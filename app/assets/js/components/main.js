module.exports = {
    navs: {
        fixedTop: require('./nav/fixed-top.js')
    },
    auth: {
        login: require('./auth/Login'),
        register: require('./auth/Register')
    },
    dashboard: {
        main: require('./dashboard/dashboard')
    },
    lessons: {
        lesson: require('./lessons/lesson')
    }
}