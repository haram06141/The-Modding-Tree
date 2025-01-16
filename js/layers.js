addLayer("A", {
    name: "Alphabet", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "alphabet", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = player.points
	    if (mult.gte(10)) mult = mult.mul(10).pow(0.5)
	    if (mult.gte(200)) mult = mult.div(200).pow(0.15).mul(200)
	    if (hasupgrade('p',12)) mult = mult.mul(upgradeEffect("p",12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "A",
            description: "alphabet boost point gain base",
            
            cost: new Decimal("1"),
            effect(){
		base = player.A.points
		    if (base.gte(10)) base = base.mul(1000).pow(0.25).min(200)
                return base
            },
             effectDisplay() {
				return "+" + upgradeEffect("A",11) + "to point base"
            }
	},
        12: {
            title: "B",
            description: "alphabet boost Math gain",
            
            cost: new Decimal("200"),
            effect(){
		base = player.A.points.add(200).div(200).pow(0.15)
		    if (base.gte(10)) base = base.mul(1000).pow(0.25).min(200)
                return base
            },
             effectDisplay() {
				return "+" + upgradeEffect("A",11) + "to point base"
            }
	},
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})
addLayer("B", {
    name: "Math", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "Math", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["A"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = player.points.div(200).pow(0.3)
	    if (mult.gte(10)) mult = mult.mul(10).pow(0.5)
	    if (mult.gte(200)) mult = mult.div(200).pow(0.15).mul(200)
	    if (hasupgrade('A',12)) mult = mult.mul(upgradeEffect("A",12)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Add",
            description: "Math boost point gain base",
            
            cost: new Decimal("1"),
            effect(){
		base = player.B.points.add(1)
		    if (base.gte(10)) base = base.mul(1000).pow(0.25).min(200)
                return base
            },
             effectDisplay() {
				return "+" + upgradeEffect("B",11) + "to point base"
            }
	},
        12: {
            title: "mult",
            description: "Math boost point gain",
            
            cost: new Decimal("10"),
            effect(){
		base = player.B.points.add(10)
		    if (base.gte(10)) base = base.mul(1000).pow(0.25).min(200)
                return base
            },
             effectDisplay() {
				return "x" + upgradeEffect("B",11) + "to point"
            }
	},
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("A",11)}
})
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "Math", // Name of resource prestige is based on
    baseAmount() {return player.B.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "What",
            description: "PP boost base point gain",
            
            cost: new Decimal("1"),
            effect(){
		base = player.p.points.add(1)
		    if (base.gte(10)) base = base.mul(1000).pow(0.25).min(200)
                return base
            },
             effectDisplay() {
				return "+" + upgradeEffect("B",11) + "to point base"
            }
	},
        12: {
            title: "Add^2",
            description: "PP boost Alphabet gain",
            
            cost: new Decimal("10"),
            effect(){
		base = player.p.points.add(10)
		    if (base.gte(10)) base = base.mul(1000).pow(0.25).min(200)
                return base
            },
             effectDisplay() {
				return "x" + upgradeEffect("B",11) + "to point"
            }
	},
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
