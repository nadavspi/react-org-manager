var getConfig = require('hjs-webpack');


module.exports = getConfig({
  in: 'src/App.js',
  out: 'public',
  clearBeforeBuild: true
});
