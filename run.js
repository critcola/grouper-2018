const Discord = require('discord.js');
const dotenv = require('dotenv').config();

const indicator = String.fromCodePoint('0x1F3AE');
const groupIndicator = String.fromCodePoint('0x2501');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', function(oldMember, member) {

  if(!member.voiceChannelID) return;

  let channel = member.guild.channels.get(member.voiceChannelID);

  if(!channel.name.startsWith(indicator)) return;

  channel.clone(groupIndicator+' Group', true)
    .then(function(newChannel) {
      
      newChannel
        .edit({
          bitrate: 96000,
          position: channel.position + 1,
          userLimit: channel.userLimit
        })
        .then(function(newChannel) {
          member.setVoiceChannel(newChannel)
        });

    });

});

client.login(process.env.DISCORD_TOKEN);
