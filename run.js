const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const Grouper = require('./src/Grouper');

const indicator = String.fromCodePoint('0x1F3AE');
const groupIndicator = String.fromCodePoint('0x2501');

const client = new Discord.Client();
const grouper = new Grouper({
  client: client,
  indicator: indicator,
  groupIndicator: groupIndicator
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  grouper.init();
});

client.on('voiceStateUpdate', function(oldMember, member) {

  if(oldMember) {
    grouper.clearChannels();
  }

  if(!member.voiceChannelID) return;

  let channel = member.guild.channels.get(member.voiceChannelID);

  grouper.clearChannels();
  
  if(!channel.name.startsWith(indicator)) return;

  channel.clone(groupIndicator+' Group', true)
    .then(function(newChannel) {
      
      newChannel
        .edit({
          bitrate: 96000,
          position: channel.position,
          userLimit: channel.userLimit,
          parent: channel.parentID
        })
        .then(function(newChannel) {
          member.setVoiceChannel(newChannel)
        })
        .catch(function(error) {
          console.log(error);
        });

    });

});

client.on('channelDelete', function() {
  grouper.init();
});

client.on('message', msg => {
  if (msg.content === '!clear') {
    grouper.clearChannels();
  }
});


client.login(process.env.DISCORD_TOKEN);
