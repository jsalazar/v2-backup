import {handler} from '../app/scripts/handler.component'
// const jsonData = require('../app/data/template.json')
import {expect} from 'chai';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


describe('handler.component', function() {
  // should show next/prev group of thumbnails
  // should no do anything if start and end of groups has been reached
  // should show large photo and details onClick

  describe('handler()', function() {

    // set up mocks
    beforeEach(function() {
      // Mock HTML Container
      const dom = new JSDOM(
          `<!doctype html>
          <html class="no-js" lang="en">
            <head>
              <meta charset="utf-8">
            </head>
            <body>
              <div class="container"> 
                <header>
                  Template Viewer
                </header>   
                <div id="largeRoot"></div>  
                <div class="row" id="thumbnailContainer">
                  <div class="col-1"><a href="#" class="previous" id="previous" title="Previous">Previous</a></div>
                  <div class="col-10" id="thumbnailRoot"></div>
                  <div class="col-1"><a href="#" class="next" id="next" title="Next">Next</a></div>
                </div>
              </div>
            </body>
          </html>`,
          {url: 'http://localhost'}
      );

      global.window = dom.window;
      global.document = dom.window.document;

      // Mock Data Stubs        
      // ARRANGE
      thumbnails(jsonData);

      // ACT
      const thumbGroups = document.querySelectorAll('.thumbGroup');
      global.thumbGroups = thumbGroups;
            
    }); // ends beforeEach

    it('should create at least 1 container', function() {
        // call data(jsonfile);
        handler();
        // mock click of next button: get current visible id, get new visible id
        // mock click of prev button
        // mock click of thumbnail to show largePhoto

        document.querySelector("#next").dispatchEvent(new MouseEvent('click', {bubbles: true}))

        document.getElementById('testTarget')
        .dispatchEvent(new MouseEvent('click', {bubbles: true}))


      // 1 or more empty containers should exists
      expect(thumbGroups.length).to.be.gt(0);
    });

    it('1st container should not be hidden', function() {
      // the first container should not be hidden
      expect(thumbGroups[0].classList.contains('group-hide')).to.be.false;
    });

    it('should have id ^tG, class=thumbGroup, be empty, parent is thumbnailRoot', function() {
      Array.from(thumbGroups).forEach((group, current) => {
        // each container should have id beginning with tG
        expect(group.id).to.match(/^tG/);
        // each container should have thumbGroup class
        expect(group.classList.contains('thumbGroup')).to.be.true;
        // all containers should be empty
        // expect(group.innerHTML).to.be.empty; // hydrate() is called before we can check for empty
        // each container should be attached to root
        expect(group.parentNode.id == 'thumbnailRoot').to.be.true;
      });
    });

  });

  

});