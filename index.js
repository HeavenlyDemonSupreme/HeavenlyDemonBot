require("dotenv").config();
const axios = require("axois");
const { Character, realms } = require("./game");
const { loadCharacter, characterExists, saveCharacter } = require("./database");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/hdb-ping", async({ command, ack, respond }) => {
  const start = Date.now()
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/hdb-joke", async({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchile}`
    });
  } catch (error) {
    await respond({ text: "Failed to fetch a joke." });
    console.error(error)
  }
});

app.command("/hdb-create", async({ command, ack, respond }) => {
  await ack();

  if (characterExists(command.user_id)) {
    respond("You already have a character.");
    return;
  }

  const player = Character.createNew(command.user_id, command.user_name);

  saveCharacter(player);
});

app.command("/hdb-status", async({ command, ack, respond }) => {
  await ack();
  // Retrieves the character data that corresponds to the userId of the commmand executor
  const data = loadCharacter(command.user_id);
  // If no corresponding character data exists in the database, tell user that
  if (!data) {
    await respond({text: "You don't have a character yet."});
    return;
  }
  // Create a new instance of character class with the data retrieved
  const player = new Character(data);
  // Generate the status window containing all character data in a set format
  await respond({ text: player.getStatusText() });
});

(async () => {
  try {
    await app.start();
    console.log("Bot is running!");
  } catch (error) {
    console.error("Failed to start bot:", error)
  }
})();