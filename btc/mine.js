const http = require("http");

const options = {
  method: "POST",
  hostname: "127.0.0.1",
  port: "8332",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic YWRtaW46MQ==",
    "cache-control": "no-cache",
    "Postman-Token": "9fb49641-c334-4afa-993a-19a203d97eb7"
  }
};

function mine() {
  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(
    JSON.stringify({ jsonrpc: 2, id: 1, method: "generate", params: [1] })
  );
  req.end();
}

function createAddr() {
  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      var string = body.toString();
      let start = string.indexOf(":");
      let end = string.indexOf(",");
      let address = string.substring(start+2, end-1);
      tx(address);
    });
  });

  req.write(
    JSON.stringify({
      jsonrpc: 2,
      id: 1,
      method: "getnewaddress",
      params: []
    })
  );
  req.end();
}

function tx(address) {
  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(
    JSON.stringify({
      jsonrpc: 2,
      id: 1,
      method: "sendtoaddress",
      params: [address, 0.001]
    })
  );
  req.end();
}

setInterval(() => mine(), 300000);
setInterval(() => createAddr(), 150000);