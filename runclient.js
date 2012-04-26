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
for (var i = 0; i < count; i++) {
    var begin = new Date().getTime();
    client(function() {
        done ++;
        if (done == count) {
            console.log(new Date().getTime() - begin + 'ms');
            process.exit(0)
        }
    });
}
