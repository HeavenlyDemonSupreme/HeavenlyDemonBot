const realms = {
            "Mortal": {
                nextRealm: "Apprentice Martial Artist",
                expRequired: 100,
                enlightenmentRequired: 0,
                cap: 10
            },
            "Apprentice Martial Artist": {
                nextRealm: "Third-rate Martial Artist",
                expRequired: 250,
                enlightenmentRequired: 0,
                cap: 10
            },
            "Third-rate Martial Artist": {
                nextRealm: "Second-rate Martial Artist",
                expRequired: 500,
                enlightenmentRequired: 0,
                cap: 10
            },
            "Second-rate Martial Artist": {
                nextRealm: "First-rate Martial Artist",
                expRequired: 750,
                enlightenmentRequired: 0,
                cap: 10
            },
            "First-rate Martial Artist": {
                nextRealm: "Third-rate Martial Artist",
                expRequired: 1000,
                enlightenmentRequired: 1,
                cap: 10
            },
            "Peak Martial Master": {
                nextRealm: "Supreme Peak Martial Grandmaster",
                expRequired: 1500,
                enlightenmentRequired: 2,
                cap: 10
            },
            "Supreme Peak Martial Grandmaster": {
                nextRealm: "Ultimate Peak Martial Great Grandmaster",
                expRequired: 2000,
                enlightenmentRequired: 3,
                cap: 10
            },
            "Ultimate Peak Martial Great Grandmaster": {
                nextRealm: "Unrestrained Realm",
                expRequired: 3000,
                enlightenmentRequired: 5,
                cap: 10
            },
            "Unrestrained Realm": {
                nextRealm: "Profound Realm",
                expRequired: 4000,
                enlightenmentRequired: 7,
                cap: 10
            },
            "Profound Realm": {
                nextRealm: "Natural Realm",
                expRequired: 5000,
                enlightenmentRequired: 9,
                cap: 10
            },
            "Natural Realm": {
                nextRealm: "Life-and-Death Realm",
                expRequired: 7500,
                enlightenmentRequired: 12,
                cap: 10
            },
            "Life-and-Death Realm": {
                nextRealm: "Void Realm",
                expRequired: 10000,
                enlightenmentRequired: 15,
                cap: 10
            },
            "Void Realm": {
                nextRealm: "Willful Realm",
                expRequired: 12500,
                enlightenmentRequired: 18,
                cap: 10
            },
            "Willful Realm": {
                nextRealm: "Enlightenment Realm",
                expRequired: 15000,
                enlightenmentRequired: 23,
                cap: 10
            },
            "Enlightenment Realm": {
                nextRealm: "Heart Realm",
                expRequired: 17500,
                enlightenmentRequired: 28,
                cap: 10
            },
            "Heart Realm": {
                nextRealm: "Conception Realm",
                expRequired: 20000,
                enlightenmentRequired: 33,
                cap: 10
            },
            "Conception Realm": {
                nextRealm: "Third-rate Martial Artist",
                expRequired: 25000,
                enlightenmentRequired: 40,
                cap: 10
            },
            "Qi Gathering": {

            }
        };

class Character {
    constructor(data) {
        // this.userId = data.userId, this is what assign() does, taking stored information in the database to use as the instance's object information
        Object.assign(this, data)
    }

    static createNew(userId, name) {
        // Creates a new instance of class Character with this object information
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
            enlightenments: 0,
            hp: 5,
            qi: 0,
            exp: 0,
            // External Boosts
            realmBreakthroughBonus: 0,
            maxHpMultiplier: 0,
            maxQiMultiplier: 0,
            // Others
            heartDemon: false,
            items = [],
            // Temporary Attributes
            pendingDecision: false,
            breakthroughChance: 0,
        });
    }
    // Derived Stats
    get maxHp() {
        return this.constitution * 5 + maxHpMultiplier;
    }
    get maxQi() {
        return this.qicapacity * 5 + maxQiMultiplier;
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
    get statCap() {
        return this.realmData?.cap ?? Infinity;
    }

    // Returns Contents of Status Window
    getStatusText() {
        return `
===== STATUS WINDOW =====
👤 Name: ${this.name}
👑 Title: ${this.title}
💪 Realm: ${this.realm}
🏯 Sect: ${this.sect}

✨ EXP: ${this.exp}/${this.maxExp}
💖 HP: ${this.hp}/${this.maxHp}
🌀 QI: ${this.qi}/${this.maxQi}

⚔️ Strength: ${this.strength}
🛡️ Constitution: ${this.constitution}
⚡ Agility: ${this.agility}
🧠 Intelligence: ${this.intelligence}
♾️ Qi Capacity: ${this.qicapacity}
===== STATUS WINDOW =====
        `;
    }
    // Input game logic functions here, then call them in index.js using game.[functionName]
    getBreakthroughPreview() {
        // If breakthrough requirements aren't met
        if (this.exp < this.expRequired || this.enlightenments < this.enlightenmentRequired) {
            // Function returns message to inform the player they haven't met the requirements
            return "You do not meet the breakthrough requirements.";
        // If breakthrough requirements are met
        } else {
            // Variable for chance of suceeding breakthrough: 50%
            let chance = 50;
            // Add the external breakthrough boost, capped at 30%
            chance += Math.min(this.realmBreakthroughBonus, 30);
            // Calculate excess exp into increasing breakthrough chance, every 5% of excess exp adds 1% chance of success
            const excessExp = Math.max(0, this.exp - this.expRequired);
            const excessExpPercent = (excessExp / this.expRequired) * 100;
            chance += Math.floor(excessExpPercent / 5);
            // Calculate excess enlightenments into increasing breakthrough chance, each excess enlightenment adds 2% chance of success
            const excessEnlightenment = Math.max(0, this.enlightenments - this.enlightenmentRequired);
            chance += excessEnlightenment * 2;
            // Caps the chance of success to 100%
            chance = Math.min(chance, 100);
            // Creates message variable
            let message = "";

            if (chance == 100) {
                message += "🌟 Every aspect of your cultivation has reached complete harmony. Your foundation is flawless, a reflection of heavenly perfection. A successful breakthrough is all but certain.\n";
            } else if (chance >= 90) {
                message += "🌟 Your cultivation has reached a near-perfect state. Only the most unfortunate circumstances could prevent a successful breakthrough.\n";
            } else if (chance >= 80) {
                message += "✨ Your qi flows smoothly through your meridians. The conditions for a breakthrough appear favorable, and success is likely.\n";
            } else if (chance >= 70) {
                message += "✨ Your foundation seems quite stable. While failure is still possible, your preparations have noticeably improved your odds\n";
            } else if (chance >= 60) {
                message += "⚠️ Your cultivation has reached the minimum threshold. You possess a reasonable chance of success, though significant risks remain.\n";
            } else {
                message += "⚠️ Your foundation appears unstable. Although a breakthrough is possible, failure remains a serious concern.\n";
            }
            message += "Are you sure you want to breakthrough now?(Y/N)\n";
            this.pendingDecision = true;
            this.breakthroughChance = chance;
            return message;
        }
    }
    // Execute a Y/N decision
    decisionHandler(playerChoice) {
        const chance = this.breakthroughChance;
        this.pendingDecision = false;
        this.breakthroughChance = 0;

        if (playerChoice === true) {
            return this.realmBreakthrough(chance);
        } else {
            return "You chose not to breakthrough. Your qi settles back into your meridians.";
        }
    }
    // Execute a breakthrough
    realmBreakthrough(chance) {
        // Generates a random number from 1-100, .random generates a number from 0.00 to 0.99 that will be multiiplied by 100, while .floor rounds it to an integer
        const roll = Math.floor(Math.random() * 100) + 1;
        // If the randomly generated number is within the chance
        if (roll <= chance) {
            // Successful Breakthrough
            const oldRealm = this.realm;
            this.realm = this.nextRealm;
            this.exp = 0;
            this.enlightenments = 0;
            this.qi = 0;
            return `🎉 Congratulations! You have broken through from ${oldRealm} to ${this.realm}!`;
        }
        // If breakthrough failed then exp gets reduced 30% rounded, enlightenments reduced 20% rounded, hp reduces 50% rounded with a cap of at least having 1 hp
        this.exp = Math.floor(this.exp * 0.7);
        this.enlightenments = Math.floor(this.enlightenments * 0.8);
        this.hp = Math.max(1, Math.floor(this.hp * 0.5));
        this.qi = 0;
        // Message to return upon failure
        let message = "💥 Breakthrough Failed\n";
        // Generates a random number between 0.00 - 9.99
        const statLossRoll = Math.random() * 100;
        // Variable for number of stats that get affected
        let numberOfStats= 0;
        // 5% chance of not suffering any stat losses(5 - 0)
        if (statLossRoll < 5) {
            numberOfStats = 0;
        // 15% chance of suffering one stat loss(20 - 15)
        } else if (statLossRoll < 20) {
            numberOfStats = 1;
        // 30% chance of suffering 2 stat losses(50 - 20)
        } else if (statLossRoll < 50) {
            numberOfStats = 2;
        // 30% chance of suffering 3 stat losses(80 - 50)
        } else if (statLossRoll < 80) {
            numberOfStats = 3;
        // 15% chance of suffering 4 stat losses(95 - 80)
        } else if (statLossRoll < 95) {
            numberOfStats = 4;
        // 5% chance of suffering 5 stat losses(100 - 95)
        } else {
            numberOfStats = 5;
        }
        // Message if no stat losses are suffered
        if (numberOfStats === 0) {
            message += "🍀 Bless with heaven-defying luck, you merege unscathes from the failed breakthrough. You suffer no permanent stat loss.\n";
        } else {
            // Creating an array variable containing all stats
            const stats = [
                "strength",
                "constitution",
                "agility",
                "intelligence",
                "qicapacity"
            ];
            // Copies the stats array with ...stats, rearranges the members of the array randomly with .sort and .random, then takes the first [numberOfStats](e.g. 3) members of the rearranged copied array and delete the rest with .slice
            const selectedStats = [...stats].sort(() => Math.random() - 0.5).slice(0, numberOfStats);
            // Loops for each stat in the selected stats array
            for (const stat of selectedStats) {
                // Reduces the stat by 90% rounded, with a cap of at least 1 point 
                this[stat] = Math.max(1, Math.floor(this[stat] * 0.9));
                // The message based on the stat reduced in case format
                switch (stat) {
                case "strength":
                    message += "⚠️ Your reckless attempt at forcing a breakthrough has strained your muscles and tendons. Strength has decreased by 10%.\n";
                    break;
                case "constitution":
                    message += "⚠️ Violent qi backlash has damaged your body's foundation. Constitution has decreased by 10%.\n";
                    break;
                case "agility":
                    message += "⚠️ The turbulent flow of qi has clogged several of your meridians. Agility has decreased by 10%.\n";
                    break;
                case "intelligence":
                    message += "⚠️ Your mind was unable to withstand the backlash of the failed breakthrough. Intelligence has decreased by 10%.\n";
                    break;
                case "qicapacity":
                    message += "⚠️ Cracks have formed within your dantian after the failed breakthrough. Qi Capacity has decreased by 10%.\n";
                    break;
                }
            }
            // Executes the code with a 1% probability
            if (Math.random() < 0.01) {
                this.heartDemon = true;
                message += "👿 Your obsession with the failure birthed a Heart Demon that has taken root within your mind.\n";
            }
            return message
        }
    }
}

module.exports = {
    Character,
    realms
}