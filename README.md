# Discord Bot - Channel Notifier & Staff Ping Monitor

A Discord bot with two main features:
1. **Channel Notifications** - Sends a welcome embed message in newly created channels under a specific category
2. **Staff Ping Protection** - Warns users when they ping staff members, directing them to use support channels instead

## Features

### Channel Creation Notifications
- Automatically detects when a new channel is created under a specified category
- Sends a welcome embed message directly in the new channel (1-2 second delay)
- Includes notices about staff time zones and partnership information
- Only works with text-based channels (skips voice/stage channels)

### Staff Ping Protection
- Monitors all messages for staff member mentions
- Automatically warns users who ping staff members
- Directs users to the support ticket channel
- Helps reduce unnecessary staff pings and improves server management

## Setup Instructions

### Prerequisites
- Node.js (v16.9.0 or higher recommended)
- npm or yarn
- A Discord server where you have administrative permissions
- Discord Developer Portal account

### Step 1: Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** and give it a name
3. Navigate to the **"Bot"** section in the left sidebar
4. Click **"Add Bot"** and confirm
5. Under **"Token"**, click **"Reset Token"** or **"Copy"** to get your bot token
6. Scroll down to **"Privileged Gateway Intents"** and enable:
   - **Message Content Intent** (required for message monitoring)

### Step 2: Invite the Bot to Your Server

1. Go to **"OAuth2"** > **"URL Generator"** in the left sidebar
2. Under **"Scopes"**, select: `bot`
3. Under **"Bot Permissions"**, select:
   - `View Channels`
   - `Send Messages`
   - `Embed Links`
   - `Read Message History` (recommended)
4. Copy the generated URL at the bottom
5. Open the URL in your browser
6. Select your server and authorize the bot

### Step 3: Get Your Category ID

1. In Discord, go to **User Settings** > **Advanced**
2. Enable **"Developer Mode"**
3. Navigate to your server
4. Right-click on the category you want to monitor
5. Select **"Copy ID"** (this is your category ID)

### Step 4: Configure the Bot

1. Create a `.env` file in the project root directory
2. Add the following content:
   ```env
   # Discord Bot Token (from Step 1)
   BOT_TOKEN=your_bot_token_here

   # Category ID to monitor (from Step 3)
   CATEGORY_ID=your_category_id_here
   ```
3. Replace the placeholder values with your actual bot token and category ID

### Step 5: Install Dependencies and Run

```bash
# Install dependencies
npm install

# Run the bot
npm start
```

Or run directly:
```bash
node bot.js
```

## Configuration

### Environment Variables

The bot uses a `.env` file for configuration. Required variables:

- `BOT_TOKEN` - Your Discord bot token (required)
- `CATEGORY_ID` - The category ID to monitor for new channels (required)

### Hardcoded Values

The following values are currently hardcoded in `bot.js` and may need to be adjusted for your server:

- `STAFF_ROLE_ID` - Role ID for staff members (currently: `1200274158077100085`)
- `SUPPORT_CHANNEL_ID` - Channel ID for support tickets (currently: `1258145718279868506`)

To change these values, edit `bot.js` and modify the constants at the top of the file.

## How It Works

### Channel Creation Notifications

1. The bot listens for channel creation events across the server
2. When a new channel is created, it checks if the channel belongs to the specified category
3. If it's a text-based channel under the monitored category:
   - The bot waits 1-2 seconds (randomized)
   - Sends a welcome embed message with:
     - Staff time zone notice
     - Partnership information and instructions
4. Voice channels and stage channels are automatically skipped

### Staff Ping Protection

1. The bot monitors all messages sent in the server
2. When a message contains user mentions, it checks if any mentioned users have the staff role
3. If a staff member is mentioned:
   - The bot immediately sends a warning message
   - The warning includes:
     - An animated notification bell emoji
     - A message telling the user not to ping staff
     - A link to the support ticket channel
4. Bot messages are ignored to prevent loops

## Requirements

- **Node.js** - v16.9.0 or higher (v18+ recommended)
- **discord.js** - v14.14.1 (installed via npm)
- **dotenv** - For environment variable management

## Bot Permissions

The bot requires the following permissions in your server:

- ✅ View Channels
- ✅ Send Messages
- ✅ Embed Links
- ✅ Read Message History (recommended)

Make sure the bot has these permissions in:
- The monitored category (for channel notifications)
- All channels where you want staff ping protection to work
- The support ticket channel (referenced in warnings)

## Notes

- The bot must be online to detect channel creations and monitor messages
- Channel notifications only work for channels created while the bot is running
- Only text-based channels (text, forum, etc.) receive the welcome message
- Voice channels and stage channels cannot receive text messages and are skipped
- Staff ping warnings are sent immediately without delay
- The bot ignores its own messages to prevent infinite loops

## Troubleshooting

### Bot doesn't respond to channel creation
- Verify the bot is online and running
- Check that `CATEGORY_ID` is set correctly in `.env`
- Ensure the bot has permission to view and send messages in the category
- Check the console for error messages

### Staff ping warnings not working
- Verify the staff role ID is correct in `bot.js`
- Ensure the bot has the **Message Content Intent** enabled in the Discord Developer Portal
- Check that the bot has permission to send messages in the channel
- Verify the mentioned user actually has the staff role

### General issues
- Check your `.env` file has correct values (no quotes around values)
- Ensure Node.js version is 16.9.0 or higher
- Review console logs for specific error messages
- Verify all required permissions are granted to the bot

## License

MIT
