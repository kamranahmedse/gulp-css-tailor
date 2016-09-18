'use strict';

var should = require('should');
var tailor = require('../');


describe('gulp-css-tailor', function () {

  it('should emit an error when it isStream()', function (done) {

    var instance = tailor();
    var stream = {
      isNull: function () {
        return false
      },
      isStream: function () {
        return true
      },
      isBuffer: function () {
        return false
      }
    };

    instance.on('error', function (error) {
      error.message.should.equal('Streaming is not supported');
      done();
    });

    instance.write(stream)

  });

  /** @todo Add tests */

});
