var R = require('react');
var ReactDOM = require('react-dom');

var Home = R.createClass({
  render: function () {
    return (
      R.createElement("div", {},
        R.createElement("h1", {}, "Comments"),
        R.createElement('textarea', {
         placeholder: 'New comment...'
       })
      )
    );
  }
});

module.exports = Home;
