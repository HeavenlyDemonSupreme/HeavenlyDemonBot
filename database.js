const fs = require("fs");

function loadDatabase() {

    try {
        // Returns the contents of players.json
        return JSON.parse(
            fs.readFileSync("./players.json")
        );
    } catch {
        return {};
    }
}

function saveDatabase(data) {
    // Stores the data in the argument in plasyers.json
    fs.writeFileSync(
        "./players.json",
        JSON.stringify(data, null, 4)
    );
}

function saveCharacter(character) {
    const database = loadDatabase();
    // Stores the character data in the argument to the database
    database[character.userId] = character;
    // Saves the updated character data to the database
    saveDatabase(database);
}

function loadCharacter(userId) {
    const database = loadDatabase();
    // Returns the character data stored in the database that corresponds to the userId in the argument
    return database[userId];
}

function characterExists(userId) {
    const database = loadDatabase();
    // returns true if the userId in the argument has a corresponding character data in the database
    return database[userId] !== undefined;
}

module.exports = {
    saveCharacter,
    loadCharacter,
    characterExists
};