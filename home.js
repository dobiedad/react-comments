var R = require('react');
var ReactDOM = require('react-dom');

var Home = R.createClass({

  newComment: function () {
    return this.refs.commentInput.value = '';
  },

  render: function () {
    return (
      R.createElement("div", {},
        R.createElement("h1", {}, "Comments"),
        R.createElement("div", {},
         R.createElement("h4", {}, "0 comments")
        ),
        R.createElement('textarea', {
         placeholder: 'New comment...',
         ref:'commentInput'
       }),
       R.createElement('button', {onClick:this.newComment},'Add comment')
      )
    );
  }
});

module.exports = Home;
