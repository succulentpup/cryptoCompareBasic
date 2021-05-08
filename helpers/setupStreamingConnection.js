const WebSocket = require('ws');
const got = require('got');

const setupStreamingConnection = (apiKey, streamedDataOut) => {
  const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
  ccStreamer.on('open', function open() {
    const subRequest = {
      'action': 'SubAdd',
      'subs': ['0~Coinbase~BTC~USD']
    };
    ccStreamer.send(JSON.stringify(subRequest));
  });

  ccStreamer.on('message', function incoming(data) {
    const jsonFormatData = JSON.parse(data);
    if (jsonFormatData.TYPE === '0'){
      streamedDataOut.push(jsonFormatData);
    }
  });

  let aggregateOfThisMinute = 0;
  let rtsMinute = 0;
  setInterval(async () => {
    aggregateOfThisMinute = 0;
    let currentMinute = new Date().getMinutes();
    streamedDataOut.forEach((dataPoint) => {
      console.log({ dataPoint }, 'dataPoint');
      rtsMinute = new Date(dataPoint.RTS * 1000).getMinutes();
      if (rtsMinute === currentMinute) { // todo:  window to minute should be improved
        aggregateOfThisMinute += dataPoint.Q;
      }
    });
    console.log({ aggregateOfThisMinute }, 'aggregateOfThisMinute');

    streamedDataOut = [];
    // fetch the data using the API
    const toTs = (Date.now()/1000).toFixed(0) - 1000;
    const ohlcvurl = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&e=Coinbase&limit=60&toTs=${toTs}&api_key=${apiKey}`;

    // todo:
    // didn't get an opportunity to understand the input params of API well, so that not able to find a way to get aggregated result for the last minute00.
    // could not find the param that can be compared with the aggregated value of computed thru streamConnection

    const result =  await got(ohlcvurl)
      .catch((error) => {
        console.log(`Error fetching data from lastMinuteData: ${JSON.stringify(error, null, 1)}`);
    });
    const body = JSON.parse(result.body);
    console.log(`body: ${JSON.stringify(body, null, 1)}`);
  }, 60000);
};

module.exports = { setupStreamingConnection };
