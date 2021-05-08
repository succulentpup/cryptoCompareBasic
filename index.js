const { setupStreamingConnection } = require('./helpers/setupStreamingConnection');

const { API_KEY = '4d6836b837f82283c0f87f472b846a529568eaf44805fdf3666693fa2dc36ff9' } = process.env;

const streamedData = [];
setupStreamingConnection(API_KEY,streamedData);

module.exports = {
  setupStreamingConnection,
};


