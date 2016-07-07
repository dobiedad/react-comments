var R = require('react');
var ReactDOM = require('react-dom');

var Home = R.createClass({

  getInitialState: function () {
    return {
      comments:[]
    }
  },

  addComment: function (comment) {
    this.state.comments.push(comment)
    this.setState({
      comments:this.state.comments
    })
  },

  render: function () {
    var self = this;
    return (
      R.createElement("div", {},
        R.createElement("h1", {}, "Comments"),
        R.createElement("div", {},
         R.createElement("h4", {}, "total: " + this.state.comments.length),
         R.createElement("ul", {},
          this.state.comments.map(function(comment){
            return R.createElement("li", {key:self.state.comments.indexOf(comment)}, comment)
          })
         )
        ),
        R.createElement(commentBox, {addComment:this.addComment},"")
      )
    );
  }

})

var commentBox = R.createClass({

  getInitialState: function () {
    return {
      emptyComment:true
    }
  },

  newComment: function () {
    var value = this.refs.commentInput.value
    this.props.addComment(value)
    this.refs.commentInput.value = "";
    return this.setState({ emptyComment: true });
  },

  checkCommentValue: function () {
    return this.setState({ emptyComment: !this.refs.commentInput.value});
  },

  render: function () {
    return (
      R.createElement("div", {},
        R.createElement('textarea', {
         placeholder: 'New comment...',
         ref:'commentInput',
         onChange:this.checkCommentValue
       }),
       R.createElement('button', {onClick:this.newComment,disabled:this.state.emptyComment},'Add comment'),
       R.createElement("div", {},this.commentIsEmpty)
      )
    );
  }
  
})

module.exports = Home;
