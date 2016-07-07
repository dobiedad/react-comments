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
      R.createElement("div", {id:'comments'},
        R.createElement("h1", {}, "Comments"),
        R.createElement("div", {},
         R.createElement("h4", {}, "Total: " + this.state.comments.length),
         R.createElement("ul", {},
          this.state.comments.map(function(comment){
            return R.createElement("li", {key:self.state.comments.indexOf(comment)},
              R.createElement("h6", {}, comment.name)
            , comment.body)
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
      emptyValue:true
    }
  },

  newComment: function () {
    var comment = {
      name:this.refs.nameInput.value,
      body:this.refs.commentArea.value
    }
    this.props.addComment(comment)
    this.refs.commentArea.value = "";
    this.refs.nameInput.value = "";
    return this.setState({ emptyValue: true });
  },

  checkValue: function () {
    return this.setState({ emptyValue: !this.refs.commentArea.value || !this.refs.nameInput.value});
  },

  render: function () {
    return (
      R.createElement("div", {},
        R.createElement('input', {
         placeholder: 'Your name...',
         ref:'nameInput',
         onChange:this.checkValue
       }),
        R.createElement('textarea', {
         placeholder: 'New comment...',
         ref:'commentArea',
         onChange:this.checkValue
       }),
       R.createElement('button', {onClick:this.newComment,disabled:this.state.emptyValue},'Add comment'),
       R.createElement("div", {},this.commentIsEmpty)
      )
    );
  }

})

module.exports = Home;
