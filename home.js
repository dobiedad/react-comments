var R = require('react');
var ReactDOM = require('react-dom');
var Home = R.createClass({
  render: function() {
    return R.createElement('h1', {}, "Comments")
  }
});

module.exports = Home;
