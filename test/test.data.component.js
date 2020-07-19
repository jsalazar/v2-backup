import data from '../app/scripts/data.component'
import {expect} from 'chai';
var request = require('request');
// var assert = require('chai').assert;
// var expect = require('chai').expect;
// var should = require('chai').should();
// OR cache chai
// const chai = require('chai')
// const expect = chai.expect


describe('data.component', function() {

    describe('data()', function() {

        it('should be a string path or url', function() {
            const dataURL = 'data/template.json';
            expect(dataURL).to.be.a('string');
        });

        it('should respond with 200 http status code', function(done) {
            request('http://localhost:9000/data/template.json' , function(error, response, body) {
                // console.log('error:', error); 
                // console.log('response:', response); 
                // console.log('statusCode:', response.statusCode); 
                // console.log('body:', body);
                // console.log('type:', response.type);  
                    // const bodyParsed = JSON.parse(body);
                    // console.log(bodyParsed[0]);
                    // console.log(bodyParsed[0].title);
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('should fetch json from file', function(done) {
            request('http://localhost:9000/data/template.json' , function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('should return specific properties (title, cost, id, etc)', function(done) {
            request('http://localhost:9000/data/template.json' , function(error, response, body) {
                const bodyObj = JSON.parse(body);
                expect(bodyObj[0]).to.have.keys(['cost', 'description', 'id', 'image', 'thumbnail', 'title']);
                done();
            });
        });

        it('should pass json to two functions');

    });

});