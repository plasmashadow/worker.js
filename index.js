var Emitter = require('events').EventEmitter;



function Process(fn, params) {
    this.process = fn;
    var URL = window.URL;
    //http://stackoverflow.com/questions/5408406/web-workers-without-a-separate-javascript-file
    this.blob = URL.createObjectURL(new Blob(['(', fn, ').apply(null,[', params, '])'], {
        type: 'application/javascript'
    }))
    return this.blob;
}

module.exports = Thread = function(){
  this.tasks = [];
  this.workers = [];
  this.worker_maps = {};
}

Thread.prototype = new Emitter;

Thread.prototype.addTask = function(fn, params){
  var task = Process(fn, params);
  var obj = [new Date().getTime(),task];
  this.tasks.push(obj);
  return obj[0];
}


Thread.prototype.start = function(){
  var that = this;
  this.tasks.forEach(function(tsk){
    var worker = new Worker(tsk[1]);
    that.worker_maps[tsk[0]] = worker;
    worker.onmessage = function(message){
      that.emit('message', message);
    }
    worker.onclose = function(data){
      that.emit('close', data);
    }
    worker.onerror = function(error){
      that.emit('error', error);
    }
    that.workers.push(worker);
  });
}

Thread.prototype.message =function(id, message){
  this.worker_maps[id].postMessage(message);
}
