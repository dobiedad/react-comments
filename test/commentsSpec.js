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
  describe('Displays comment form', function() {

    it('shows the title', function() {
      return browser.find('h1',{text:'Comments'}).shouldExist()
    });

    it('allows me to type a new comment', function() {
      return browser.find('textarea').typeIn('first comment yo!')
    });

    it('allows me to submit the new comment', function() {
      return browser.find('button',{text:'Add comment'}).click()
    });

  })

  describe('new comment', function() {

    it('shows when no one has posted a comment', function() {
      return browser.find('h4',{text:'0 comments'}).shouldExist();
    });

    it('clears the input when submitting', function() {
      return browser.find('textarea').typeIn('first comment yo!').then(function(){
        return browser.find('button',{text:'Add comment'}).click().then(function(){
          return browser.find('textarea',{value:'first comment yo!'}).shouldNotExist()
        });
      })
    });

  })

});
