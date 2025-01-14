addLayer("training", {
    name: "Training", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires(){
        return new Decimal(5)
    }, // Can be a function that takes requirement increases into account
    resource: "Training", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        return new Decimal(1)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('training', 13)) mult = mult.times(upgradeEffect('training', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title: "Time to get stronger",
            description: "Begin training. Gain 1 Powerlevel per second.",
            cost: new Decimal(0),
        },
        12:{
            title: "Time to get stronger 2",
            description: "Begin training. Double power level gain",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:{
            title: "Time to get stronger 3",
            description: "Begin training. Double power level gain",
            cost: new Decimal(2),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    
    tabFormat: {
        "main" : {
            

                content: 
                    ["main-display",
                    "prestige-button", "resource-display",
                    ["bar", "bigBar"],
                    ["blank", "20px"], // Height
                    

                    "h-line", "milestones", "blank", "upgrades", "challenges"],
                glowColor: "blue",
        }
    },
    bars: {
        bigBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { return 0.5 },
            unlocked(){return true}
            
        },
    }
})
