const http = require('http');
const options = {
  // host: '192.168.101.125',
  host: '127.0.0.1',
  port: 8001,
  method: 'POST'
};
//requestSample();

// konsol da bekler
process.stdin.addListener('data', f => {
  // for (var i = 0; i < 100; i++) {
  // }
  requestSample(
    {
      'level'   : 'warn',
      'msg'     : 'sample message',
      'name'    : 'apiname'
    }
  );

})

function requestSample(f) {
  const req = http.request(options, res => {
    // const ip = req.socket.localAddress;
    // const port = req.socket.localPort; 
    // console.log(res);
    res.on('data', function (chunk) {
      console.log(chunk.toString());
    });
  });

  req.write(JSON.stringify(f));
  req.end();
}
