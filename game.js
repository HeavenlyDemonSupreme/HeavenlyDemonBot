const realms = {
            "Mortal": {
                nextRealm: "Apprentice Martial Artist",
                expRequired: 100,
                enlightenmentRequired: 0
            },
            "Apprentice Martial Artist": {
                nextRealm: "Third-rate Martial Artist",
                expRequired: 250,
                enlightenmentRequired: 0
            },
            "Third-rate Martial Artist": {
                nextRealm: "Second-rate Martial Artist",
                expRequired: 500,
                enlightenmentRequired: 0
            },
            "Second-rate Martial Artist": {
                nextRealm: "First-rate Martial Artist",
                expRequired: 750,
                enlightenmentRequired: 0
            },
            "First-rate Martial Artist": {
                nextRealm: "Third-rate Martial Artist",
                expRequired: 1000,
                enlightenmentRequired: 1,
            },
            "Peak Martial Master": {
                nextRealm: "Supreme Peak Martial Grandmaster",
                expRequired: 1500,
                enlightenmentRequired: 2
            },
            "Supreme Peak Martial Grandmaster": {
                nextRealm: "Ultimate Peak Martial Great Grandmaster",
                expRequired: 2000,
                enlightenmentRequired: 3
            },
            "Ultimate Peak Martial Great Grandmaster": {
                nextRealm: "Unrestrained Realm",
                expRequired: 3000,
                enlightenmentRequired: 5
            },
            "Unrestrained Realm": {
                nextRealm: "Profound Realm",
                expRequired: 4000,
                enlightenmentRequired: 7
            },
            "Profound Realm": {
                nextRealm: "Natural Realm",
                expRequired: 5000,
                enlightenmentRequired: 9
            },
            "Natural Realm": {
                nextRealm: "Life-and-Death Realm",
                expRequired: 7500,
                enlightenmentRequired: 12
            },
            "Life-and-Death Realm": {
                nextRealm: "Void Realm",
                expRequired: 10000,
                enlightenmentRequired: 15
            },
            "Void Realm": {
                nextRealm: "Willful Realm",
                expRequired: 12500,
                enlightenmentRequired: 18
            },
            "Willful Realm": {
                nextRealm: "Enlightenment Realm",
                expRequired: 15000,
                enlightenmentRequired: 23
            },
            "Enlightenment Realm": {
                nextRealm: "Heart Realm",
                expRequired: 17500,
                enlightenmentRequired: 28
            },
            "Heart Realm": {
                nextRealm: "Conception Realm",
                expRequired: 20000,
                enlightenmentRequired: 33
            },
            "Conception Realm": {
                nextRealm: "Third-rate Martial Artist",
                expRequired: 25000,
                enlightenmentRequired: 40,
            },
            "Qi Gathering": {

            }
        };

class Character {
    constructor(data) {
        // this.userId = data.userId, this is what assign() does
        Object.assign(this, data)
    }

    static createNew(userId, name) {
        return new Character({
            // Personal Data
            userId,
            name,
            // Profile
            title: "None",
            realm: "Mortal",
            sect: "None",
            // Permanent Stats
            strength: 1,
            constitution: 1,
            agility: 1,
            intelligence: 1,
            qicapacity: 1,

            // Current Stats
            enlightenment: 0,
            hp: 100,
            qi: 50,
            exp: 0
        });
    }

    // Derived Stats
    get maxHp() {
        return this.constitution * 5 + bonusHp;
    }
    get maxQi() {
        return this.qicapacity * 5 + bonusCapacity;
    }
    get realmData() {
        return realms[this.realm];
    }
    get nextRealm() {
        return this.realmData?.nextRealm ?? null;
    }
    get maxExp() {
        return this.realmData?.expRequired ?? 0;   
    }
    get enlightenmentRequired() {
        return this.realmData?.enlightenmentRequired ?? 0;
    }

    // Print Status Window
    getStatusText() {
        return `
=== ⚔️ PLAYER STATS ===
Name: ${this.name}
👑Title: ${this.title}
🌌Realm: ${this.realm}
Sect: ${this.sect}

✨EXP: ${this.exp}/${this.maxExp}
💖HP: ${this.hp}/${this.maxHp}
🌀QI: ${this.qi}/${this.maxQi}

💪Strength: ${this.strength}
🧱Constitution: ${this.constitution}
⚡Agility: ${this.agility}
🧠Intelligence: ${this.intelligence}
Qi Capacity: ${this.qicapacity}
        `;
    }

    // Input game logic functions here, then call them in index.js using game.[functionName]
}

module.exports = {
    Character,
    realms
}