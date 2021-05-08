const WebSocket = require('ws');

const setupStreamingConnection = (apiKey) => {
  const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
  ccStreamer.on('open', function open() {
    const subRequest = {
      'action': 'SubAdd',
      'subs': ['0~Coinbase~BTC~USD']
    };
    ccStreamer.send(JSON.stringify(subRequest));
  });

  ccStreamer.on('message', function incoming(data) {
    console.log(data);
  });
};

module.exports = { setupStreamingConnection };
