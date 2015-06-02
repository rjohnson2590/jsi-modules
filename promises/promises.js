var pg = require('pg');
var settings = "postgres://localhost/cities"; // "postgres://username:password@localhost/database";
var id = process.argv[2];

if (process.argv.length <= 1) { return console.error('please provide an id to look up'); }

var client = new pg.Client(settings);
client.connect(function(err) {
    var arr= [1,2,3,4]
    var pendingTask=[]
    for (var i=1; i <= arr.length; i++){
        pendingTask.push('$'+i)
    }
  if(err)
    return console.error('could not connect to postgres', err);
    var queryText='select * from people where id IN(' + pendingTask.join(',') + ')'
  client.query(queryText,arr, function hello(err, result) {
    if(err)
      return console.error('error running query', err);

    
    console.log('%j', result.rows);

    client.end();

  });

});

// var queryText='select * from people where id IN(' + pendingTask.join(',') + ')'