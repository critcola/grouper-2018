const fs = require('fs');

module.exports = class Grouper {
  constructor(client) {
    this.client = client;
  }

  init() {
    this.client.channels.map(function(collection) {
      console.log(collection.type);
    });
    
  }
};
