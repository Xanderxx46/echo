# Discord Channel Notifier Bot

A Discord bot that sends an embed message directly in newly created channels whenever a channel is created under a specific category.

## Setup Instructions

### 1. Create a Discord Application

1. Go to https://discord.com/developers/applications
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section
4. Click "Add Bot" and confirm
5. Under "Token", click "Reset Token" or "Copy" to get your bot token
6. Enable the following Privileged Gateway Intents:
   - Server Members Intent (if needed)
   - Message Content Intent (if needed)

### 2. Invite the Bot to Your Server

1. Go to the "OAuth2" > "URL Generator" section
2. Select scopes: `bot`
3. Select bot permissions: `View Channels`, `Send Messages`, `Embed Links`
4. Copy the generated URL and open it in your browser
5. Select your server and authorize the bot

### 3. Get the Category ID

You need to enable Developer Mode in Discord:
1. Go to Discord Settings > Advanced > Enable Developer Mode
2. Right-click on the category you want to monitor and select "Copy ID"

### 4. Configure the Bot

1. Create a `.env` file in the project root with the following content:
   ```env
   # Discord Bot Token (get this from https://discord.com/developers/applications)
   BOT_TOKEN=your_bot_token_here

   # Category ID to monitor (right-click category -> Copy ID, enable Developer Mode)
   CATEGORY_ID=your_category_id_here
   ```

2. Replace the placeholder values:
   - `BOT_TOKEN`: Your bot token from step 1
   - `CATEGORY_ID`: The category ID from step 3

### 5. Install Dependencies and Run

```bash
npm install
node bot.js
```

Or use the npm script:

```bash
npm start
```

## How It Works

- The bot listens for channel creation events across your server
- When a new channel is created under the specified category, it creates an embed with:
  - Channel name
  - Channel type (Text/Voice/Forum/Stage)
  - Category name
  - Channel ID
  - Timestamp
- The embed is sent directly in the newly created channel (only text-based channels)

## Requirements

- Node.js (v16.9.0 or higher recommended)
- npm or yarn
- A Discord server where you have administrative permissions

## Notes

- The bot needs to be online to detect channel creations
- The bot will only post messages for channels created while it's running
- The bot will post the embed directly in the newly created channel
- Only text-based channels (text channels, forum channels, etc.) will receive messages
- Voice channels and stage channels are skipped as they cannot receive text messages
- Make sure the bot has appropriate permissions (View Channels, Send Messages, Embed Links) in the monitored category

