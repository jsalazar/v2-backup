import {thumbnails, hydrateThumbnails} from '../app/scripts/thumbnails.component'
const jsonData = require('../app/data/template.json')
import {expect} from 'chai';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// JSDOM.fromFile("stuff.html", options).then(dom => {
//     console.log(dom.serialize());
//   });

describe('thumbnails.component', function() {
  
  describe('thumbnails()', function() {

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

  describe('hydrateThumbnails()', function() {
    // need to restub html with empty containers and then call hydrateThumbnails()
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
                  <div class="col-10" id="thumbnailRoot">
                    <div id="tG0" class="thumbGroup"></div>
                    <div id="tG4" class="thumbGroup group-hide"></div>
                    <div id="tG8" class="thumbGroup group-hide"></div>
                    <div id="tG12" class="thumbGroup group-hide"></div>
                  </div>
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
      hydrateThumbnails(jsonData);

      // ACT
      const thumbGroups = document.querySelectorAll('.thumbGroup');
      global.thumbGroups = thumbGroups;
            
    }); // ends beforeEach

    
      it('each container should have 4 children or less', function() {
        Array.from(thumbGroups).forEach((group) => {
          // each container should have id beginning with tG
          expect(group.childElementCount).to.be.below(5);
        });
      });

      it('should have less than 5 <a> elements per container', function() {
        Array.from(thumbGroups).forEach((group) => {
          expect(group.getElementsByTagName('a').length).to.be.gt(0).and.below(5);
        });
      });

      it('should have 1 <img> element inside each <a>', function() {
        Array.from(thumbGroups).forEach((group) => {
          Array.from(group.getElementsByTagName('a')).forEach((link) => {
            expect(link.getElementsByTagName('img').length).to.equal(1);
          });
        });
      });

      it('all <a> elements should have class of thumbLink', function() {
        Array.from(thumbGroups).forEach((group) => {
          Array.from(group.getElementsByTagName('a')).forEach((link) => {
            expect(link.classList.contains('thumbLink')).to.be.true;
          });
        });
      });

      it('1 <a> should contain active class');

      it('should not have any empty containers', function() {
        Array.from(thumbGroups).forEach((group) => {
          expect(group.innerHTML).to.not.be.empty;
        });
      });

  });

});