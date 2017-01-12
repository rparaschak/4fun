/**
 * Created by rparaschak on 1/11/17.
 */

require('colors');

module.exports = {
  stack: {},
  a: function(name){
    if(!name)
      return;
    this.stack[name] = Date.now();
  },
  b: function(name){
    if(!name)
      return;
    if(!this.stack[name])
      return;
    var execTime = Date.now() - this.stack[name];
    var color;
    if(name.indexOf('Controller') > -1)
      color = 'red';
    else
      color = 'green';
    console.log((name + ': ' + execTime + 'ms')[color]);
  }
};
