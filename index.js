var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var tailor = require('css-tailor');
var _ = require('lodash');

const PLUGIN_NAME = 'gulp-css-tailor';

function gulpTailor(options) {

  var defaults = {
      filename: 'tailored.css',
      minifyOutput: false,
      tabSpacing: 2,
      setImportant: false
    },
    firstFile;

  // Setup the options
  var tempDefaults = _.cloneDeep(defaults);
  options = options || {};
  options = _.merge(tempDefaults, options);

  function bufferContents(file, encoding, callback) {

    if (file.isNull() || !file.isBuffer()) {
      callback();
      return;
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, "Streams aren't supported."));
      callback();
      return;
    }

    if (firstFile === undefined) {
      firstFile = file;
    }

    tailor.pushHtml(file.contents.toString(encoding));
    callback();
  }

  function endStream() {
    var generatedCss = tailor.generateLazy(options);
    var cssContent = options.minifyOutput ? generatedCss.minified : generatedCss.formatted;

    var outputFile = new gutil.File({
      cwd: firstFile.cwd,
      base: firstFile.base,
      path: path.join(firstFile.base, options.filename),
      contents: new Buffer(cssContent)
    });

    this.push(outputFile);
    this.emit('data', outputFile);
    this.emit('end');

    console.log('End Called');
  }

  return through.obj(bufferContents, endStream);
}

module.exports = gulpTailor;

