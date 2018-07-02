const fs = require('fs');

module.exports = class Grouper {

  constructor(config = {}) {
    this.client = config.client;
    this.indicator = config.indicator;
    this.groupIndicator = config.groupIndicator;
  }

  init() {
    let channels = [];
    let i = 0;

    this.client.channels.map(function(collection) {
      let channel = this.client.channels.get(collection.id);
      
      channel.edit({
        position: i
      });

      channels.push({
        id: collection.id,
        type: collection.type,
        name: collection.name,
        position: i
      });
      
      i++;
    }, this);
    
    fs.writeFile('channels.json', JSON.stringify(channels, null, 2), function(error) {
      if (error) console.log(error);
    });
  }

  moveChannel(parentChannel, childChannel) {
    this.init();
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

  checkOrder() {
    this.client.channels.map(function(collection) {
      let channel = this.client.channels.get(collection.id);
      console.log(channel.name+ " " +channel.position)
    }, this);
  }
};
