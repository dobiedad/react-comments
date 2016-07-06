var expect = require('chai').expect;
var browserMonkey = require('browser-monkey')
var ReactDOM = require('react-dom');
var R = require('react');
var Home = require('../home');
describe('Comments', function() {
  var browser;
  beforeEach(function(){
    var existing = document.getElementById('tests');
    if (existing) {
      document.body.removeChild(existing);
    }
    var div = document.createElement('div');
    div.id = 'tests';
    document.body.appendChild(div);
    ReactDOM.render(R.createElement(Home, null), div);
    browser = browserMonkey.scope(div)
  })

  it('shows the title', function() {
    return browser.find('h1',{text:'Comments'}).shouldExist()
  });

});
