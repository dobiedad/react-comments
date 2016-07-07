var expect = require('chai').expect;
var browserMonkey = require('browser-monkey')
var ReactDOM = require('react-dom');
var R = require('react');
var Home = require('../home');
var browser;

describe('Comments', function() {
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

  describe('Displays comment box', function() {
    it('shows the title', function() {
      return browser.find('h1',{text:'Comments'}).shouldExist()
    });

    it('allows me to type a new comment', function() {
      return browser.find('textarea').typeIn('first comment yo!')
    });

    it('allows me to type my name', function() {
      return browser.find('input').typeIn('John')
    });

    it('shows submit button', function() {
      return browser.find('button',{text:'Add comment'}).shouldExist()
    });
  })

  describe('new comment', function() {
    it('shows when no one has posted a comment', function() {
      return browser.find('h4',{text:'total: 0'}).shouldExist();
    });

    it('does not allow empty comments', function() {
      return expect(browser.find('button',{text:'Add comment'})).to.be.disabled;
    });

    it('clears the inputs when submitting', function() {
      return browser.find('textarea').typeIn('first comment yo!').then(function(){
        return browser.find('input').typeIn('john').then(function(){
          return browser.find('button',{text:'Add comment'}).click().then(function(){
            return browser.find('textarea',{value:'first comment yo!'}).shouldNotExist().then(function(){
              return browser.find('input',{value:'john'}).shouldNotExist()
            })
          })
        })
      })
    })

    describe('displaying new comment', function() {
      beforeEach(function(){
        return browser.find('textarea').typeIn('first comment yo!').then(function(){
          browser.find('input').typeIn('Max').then(function(){
            return browser.find('button',{text:'Add comment'}).click()
          })
        })
      })

      it('shows my new comment', function() {
        return browser.find('h4',{text:'total: 1'}).shouldExist().then(function(){
          return browser.find('li',{text:'first comment yo!'}).shouldExist().then(function (){
            return browser.find('h6',{text:'Max'}).shouldExist()
          })
        })
      });
    })
  })
});
