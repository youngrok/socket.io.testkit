/**
 * Created by JetBrains WebStorm.
 * User: youngrok
 * Date: 12. 4. 26.
 * Time: 오후 4:13
 * To change this template use File | Settings | File Templates.
 */
var spawn = require('child_process').spawn;

var concurrency = parseInt(process.argv[2]);
var done = 0;
var begin = new Date().getTime();

for (var i = 0; i < concurrency; i++) {
    var node = spawn('node', ['./runclient.js', process.argv[3]]);
    node.on('exit', function(code) {
        if (code != 0)
            console.log('exit code:' + code);
        done ++;
        console.log('finished ' + done)
        if (done == concurrency) {
            var elapsed = new Date().getTime() - begin;
            var tps = concurrency * parseInt(process.argv[3]) * 3.0 / elapsed * 1000;
            console.log(concurrency + ' concurrent connection, ' + process.argv[3] + ' tries, 3 messages, ' + elapsed + 'ms, ' + tps + ' messages/s')
        }

    });
    node.stdout.on('data', function(data) {
        process.stdout.write(data);
    });
    node.stderr.on('data', function(data) {
        process.stderr.write(data);
    });
}
