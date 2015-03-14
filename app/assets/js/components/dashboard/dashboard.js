var React = require('react');
var Router = require('react-router');
var db = require('../../config/db-connect');
var store = require('../../stores/DbStore');
var Authenticated = require('../../actions/auth');
var ReactFireMixin = require('reactfire');
var Link = Router.Link;

var AddLessonForm = React.createClass({
    add: function(e){
        e.preventDefault();
        var title = this.refs.lessonTitle.getDOMNode().value;
        var description = this.refs.lessonDescription.getDOMNode().value;
        if(title){
            this.props.addLesson({title: title, description: description});
            this.refs.lessonTitle.getDOMNode().value = '';
            this.refs.lessonDescription.getDOMNode().value = '';
        }
    },
    render: function(){
        return (
            <form onSubmit={this.add}>
              <div className="form-group">
                <input className="form-control" ref="lessonTitle" placeholder="Lesson Title"/><br/>
                <textarea rows="2" className="form-control" ref="lessonDescription" placeholder="Short summary"></textarea>
              </div>
              <button type="submit" className="btn btn-primary"><i className="fa fa-plus-square-o"></i> Add Lesson</button>
            </form>
        )
    }
})


var Dashboard = React.createClass({
    mixins: [Router.Navigation, Authenticated, ReactFireMixin],
    statics: {
        attemptedTransition: null
    },
    getInitialState: function(){
        return {
            lessons: [],
        }
    },
    componentWillMount: function(){
        this.bindAsArray(db._cache.lessons, 'lessons');
    },
    setLesson: function(e){
        db.actions.setLesson(e.currentTarget.hash.substr(9));
    }.bind(this),
    handleAddLesson: function(lesson){  
        debugger;
        db.actions.addLesson(lesson, function(){
            this.setState({
                showForm: false
            });
        }.bind(this));
    },
    render: function(){
        var caller = this;
        return (
          <div className="col-sm-12">
            <div className="lesson-container">
                <div className="add-lesson">
                        <h3>New Lesson</h3>
                    <AddLessonForm addLesson={this.handleAddLesson} />
                </div>
          </div>
                    {db.actions.toArray(this.state.lessons).reverse().map(function(lesson, i){
                        return (
                            <Link to='lesson' params={{id: lesson.key}} onClick={caller.setLesson} key={lesson.key}><div className="lesson-container">
                                <h3>{lesson.props.title}</h3>
                                <p>{lesson.props.description}</p>
                            </div></Link>    
                        )
                    })}
        </div>
      );
    }
});

module.exports = Dashboard;