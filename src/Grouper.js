const fs = require('fs');

module.exports = class Grouper {

  constructor(client) {
    this.client = client;
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
    
  }

};
