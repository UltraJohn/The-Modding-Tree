addLayer("dragonballs", {
    name: "Dragon balls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DBS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#888800",
    nodeStyle: {
        "width": "50px",
        "height": "50px",
        "font-size": "12px"
    },
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    resource: "Dragonballs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        return new Decimal(1)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)

    layerShown(){return true},
})
