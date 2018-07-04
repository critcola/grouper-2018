const fs = require('fs');

module.exports = class Grouper {

  constructor(config = {}) {
    this.client = config.client;
    this.indicator = config.indicator;
    this.groupIndicator = config.groupIndicator;
  }

  init() {
    let i = 1;

    let channelsSorted = this.client.channels.sort(function(a, b) {
      if (a.position < b.position)
        return -1;
      if (a.position > b.position)
        return 1;
      return 0;
    });
    
    channelsSorted.map(function(collection) {
      collection.edit({position: i});
      i++;
    });

  }

  clearChannels() {
    this.client.channels.map(function(collection) {
      let channel = this.client.channels.get(collection.id);

      if(!channel.name.startsWith(this.groupIndicator)) return;
      
      if(channel.members.array().length) return;
      
      channel.delete()
        .catch(function(error) {
          //console.log(error);
        });

    }, this);
  }
};
