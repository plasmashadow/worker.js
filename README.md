##Thread.js

Theading Implementation using HTML5 WorkerAPI.


##Installation

```
#through npm

git clone https://github.com/plasmashadow/worker.js

cd worker.js/

npm install

#on browser

<script src="thread.js"></script>

```

##Usage


###Creating Threads

```javascript

var thread = new Thread();

var childid = thread.addTask(function(a){
  for(var i=0; i< 100; i++){
    cosole.log(a);
  }
  }, "sathya");


var childid2 = thread.addTask(function(a){
    for(var i=0; i< 100; i++){
      cosole.log(a);
    }
    }, "adhi");

thread.start();

```

###Event handling

Thread Events can be managed by their respective events.

```javascript
var thread = new Thread();

thread.once('message', function(message){
  console.log(message);
})

thread.once('close', function(){
  console.log("thread is ending");
})

thread.once('error', function(error){
  console.log(error);
})

```

###Posting Message to Child Threads

Posting message can to the childs can be done with there childids.

```javascript

thread.message(childid, "please work fast");


```


##License  
MIT
