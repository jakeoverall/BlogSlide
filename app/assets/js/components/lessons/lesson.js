var React = require('react');
var Router = require('react-router');
var db = require('../../config/db-connect');
var store = require('../../stores/DbStore');
var Authenticated = require('../../actions/auth');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Showdown = require('../../../plugins/showdown').Showdown.converter;

var converter = new Showdown();

var AddSlideForm = React.createClass({
    getInitialState: function(){
        return {
            title: '',
            keyPoints: '',
            speakerNotes: ''
        }
    },
    add: function(e){
        e.preventDefault();
        var title = this.refs.slideTitle.getDOMNode().value;
        var keyPoints = this.refs.slideKeyPoints.getDOMNode().value;
        var speakerNotes = this.refs.speakerNotes.getDOMNode().value;
        if(title){
            this.props.addSlide({title: title, keyPoints: keyPoints, speakerNotes: speakerNotes});
            this.refs.slideTitle.getDOMNode().value = '';
            this.refs.slideKeyPoints.getDOMNode().value = '';
            this.refs.speakerNotes.getDOMNode().value = '';
        }
    },
    convert: function(){
        var title = this.refs.slideTitle.getDOMNode().value;
        var keyPoints = this.refs.slideKeyPoints.getDOMNode().value;
        var speakerNotes = this.refs.speakerNotes.getDOMNode().value;
        this.setState({title: title, keyPoints: keyPoints, speakerNotes: speakerNotes});
    },
    render: function(){
        return (<div>
            <form onSubmit={this.add}>
              <div className="form-group">
                <input className="form-control" ref="slideTitle" placeholder="Slide Title" onChange={this.convert}/>
                <textarea rows="8" className="form-control" ref="slideKeyPoints" onChange={this.convert} placeholder="Keypoints"></textarea>
                <input className="form-control" ref="speakerNotes" placeholder="Speaker notes..." onChange={this.convert}/>
              </div>
              <button type="submit" className="btn btn-primary"><i className="fa fa-plus-square-o"></i> Add Slide</button>
            </form>
            <h3>Slide Preview</h3>
            <div className="slide-container">
                <div className="slide-title">{this.state.title}</div>
                <div className="slide-key-points" dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.keyPoints)}}></div>
            </div>
            <div className="speaker-notes">
            <p>{this.state.speakerNotes}</p>
        </div>
        
    </div>)
}
})


var Dashboard = React.createClass({
    mixins: [Router.Navigation, Authenticated, ReactFireMixin],
    statics: {
        attemptedTransition: null
    },
    getInitialState: function(){
        return {
            slides: [],
        }
    },
    componentWillMount: function(){
        if(db._cache.lessonRef){
            this.bindAsArray(new Firebase(db._cache.lessonRef), 'slides');
        } else {
            this.replaceWith('dashboard');
        }
    },
    handleAddSlide: function(slide){  
        slide.pageNum = this.state.slides.length+ 1;
        db.actions.addSlide(slide);
    },
    render: function(){
        return (
          <div className="col-sm-12">
            <div className="slide-container">
                <div className="add-slide">
                        <h3>New Slide</h3>
                    <AddSlideForm addSlide={this.handleAddSlide} />
                </div>
          </div>
                    {db.actions.toArray(this.state.slides).sort(function(a,b){
                        return a.props.pageNum > b.props.pageNum;
                        }).map(function(slide, i){
            return (<div>
                <div className="slide-container" key={slide.key}>
                <div className="slide-title">{slide.props.title}</div>
                    <div className="slide-key-points" dangerouslySetInnerHTML={{ __html: converter.makeHtml(slide.props.keyPoints)}}></div>
                </div>        
                <div className="speaker-notes">
                    <p>Notes: {slide.props.speakerNotes}</p>
                </div>
        </div>)
        })}
        </div>
      );
}
});

module.exports = Dashboard;
