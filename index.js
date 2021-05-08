const { setupStreamingConnection } = require('./helpers/setupStreamingConnection');

const { API_KEY } = process.env;

const streamedData = [];
setupStreamingConnection(API_KEY,streamedData);

module.exports = {
  setupStreamingConnection,
};


