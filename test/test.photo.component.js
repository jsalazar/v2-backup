import {photos} from '../app/scripts/photo.component'
const jsonData = require('../app/data/template.json')
import {expect} from 'chai';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('photo.component', function() {
  
  describe('photo()', function() {

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
      photos(jsonData);

      // ACT
      const largeGroups = document.querySelectorAll('.largeGroup');
      global.largeGroups = largeGroups;
            
    }); // ends beforeEach

    it('should create at least 1 photo container', function() {
      // 1 or more empty containers should exists
      expect(largeGroups.length).to.be.gt(0);
    });

    it('1st photo container should not be hidden', function() {
      // the first container should not be hidden
      expect(largeGroups[0].classList.contains('group-hide')).to.be.false;
    });

    it('all photo containers should have a row class', function() {
        Array.from(largeGroups).forEach((group) => {
          // each container should be attached to root
          expect(group.classList.contains('row')).to.be.true;
        });
      });

    it('should have 1 <img> elements per photo container', function() {
        Array.from(largeGroups).forEach((group) => {
          expect(group.getElementsByTagName('img').length).to.equal(1);
        });
      });

    it('should have 1 div with class=details and 6 <p> elements inside of it', function() {
        Array.from(largeGroups).forEach((group) => {
            expect(group.querySelectorAll('.details').length).to.equal(1);
            expect(group.querySelector('.details').getElementsByTagName('p').length).to.equal(6);
            // Array.from(group.querySelector('.details')).forEach((link) => {
            //     expect(link.getElementsByTagName('img').length).to.equal(1);
            // });
        });
    });

    it('all photo containers should be attached to parent with id=largeRoot', function() {
        Array.from(largeGroups).forEach((group) => {
          // each container should be attached to root
          expect(group.parentNode.id == 'largeRoot').to.be.true;
        });
      });
  
  });

});