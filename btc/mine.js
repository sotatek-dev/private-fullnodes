var http = require("http");

function mine() {
  var options = {
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

setInterval(() => mine(), 15000);
