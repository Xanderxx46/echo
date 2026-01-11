const { Client, GatewayIntentBits, EmbedBuilder, Events, ChannelType } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Configuration
const CATEGORY_ID = process.env.CATEGORY_ID;
const STAFF_ROLE_ID = '1200274158077100085';
const SUPPORT_CHANNEL_ID = '1258145718279868506';

// When the client is ready, run this code
client.once(Events.ClientReady, () => {
    console.log(`Bot is ready! Logged in as ${client.user.tag}`);
    
    if (!CATEGORY_ID) {
        console.warn('Warning: CATEGORY_ID is not set in .env file');
    }
});

// Listen for channel creation events
client.on(Events.ChannelCreate, async (channel) => {
    // Only process text channels and voice channels (skip categories)
    if (channel.type === ChannelType.GuildCategory) return; // Skip category channels
    
    // Check if the channel has a parent (category)
    if (channel.parentId && CATEGORY_ID) {
        // Check if the channel is under the specified category
        if (channel.parentId === CATEGORY_ID) {
            // Only send messages to text-based channels (text, forum, etc.)
            // Voice channels and stage channels cannot receive messages
            if (!channel.isTextBased()) {
                console.log(`Skipping ${channel.name} - channel type does not support messages`);
                return;
            }
            
            // Create embed
            const embed = new EmbedBuilder()
                .setDescription([
                    '## <:ping:1324178552538533919> NOTICE',
                    'Our staff may operate in a different time zone than you. Please wait 24 hours before pinging/mentioning staff members for assistance.',
                    '',
                    '```Partnerships:```',
                    'Please run the **s!partner** command for our self-serve partnerships. A PM will be with you soon.'
                ].join('\n'))
                .setColor(0x8000ff);
            
            try {
                await channel.send({ embeds: [embed] });
                console.log(`Sent welcome message to new channel: ${channel.name}`);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
});

// Listen for message events to detect staff pings
client.on(Events.MessageCreate, async (message) => {
    // Ignore bot messages and messages without mentions
    if (message.author.bot || message.mentions.users.size === 0) return;
    
    // Check if the message mentions any users with the staff role
    const mentionedMembers = message.mentions.members;
    if (!mentionedMembers) return;
    
    let hasStaffMention = false;
    let staffMember = null;
    
    // Check each mentioned member for the staff role
    for (const [userId, member] of mentionedMembers) {
        if (member && member.roles.cache.has(STAFF_ROLE_ID)) {
            hasStaffMention = true;
            staffMember = member;
            break; // Only need to find one staff member
        }
    }
    
    // If a staff member was mentioned, send warning
    if (hasStaffMention) {
        try {
            const warningMessage = `<a:NotificationBell:1362875232334905666> Please refrain from pinging staff <@${message.author.id}>! If you need support, please open a ticket in <#${SUPPORT_CHANNEL_ID}>`;
            await message.channel.send(warningMessage);
            console.log(`Sent staff ping warning for ${message.author.tag} mentioning ${staffMember?.user.tag}`);
        } catch (error) {
            console.error('Error sending staff ping warning:', error);
        }
    }
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);

