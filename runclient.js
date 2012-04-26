/**
 * Created by JetBrains WebStorm.
 * User: youngrok
 * Date: 12. 4. 26.
 * Time: 오후 4:13
 * To change this template use File | Settings | File Templates.
 */
client = require('client').testClient;

var count = parseInt(process.argv[2]);
var done = 0;

var begin = new Date().getTime();
function finishCallback() {
//    console.log(new Date().getTime() - begin + 'ms');
    process.exit(0)
}
client(finishCallback, count);

//    process.nextTick(function() {
//    })

