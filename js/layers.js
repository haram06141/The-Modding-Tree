addLayer("lv", {
    name: "level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Lv", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Lv", // Name of prestige currency
    baseResource: "Inf exp", // Name of resource prestige is based on
    baseAmount() {return player.points.add(1).log10()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.869, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "1",
            description: "Lv boost Inf Speed",
            cost: new Decimal("1"),
            effect(){
                return upgradeEffect("lv",12).add(1).pow(0.5)
            },
             effectDisplay() {
				return upgradeEffect("lv",11) + "x Inf speed"
            }
		},
        12: {
            title: "2",
            description: "Eff lv can pass 50",
            cost: new Decimal("50"),
            effect(){
                base = player.lv.points
				    if(!hasUpgrade('lv',12)) base=base.min(50)
				    if(base.gte(50)) base=base.div(50).pow(2/3).mul(50)
					if(base.gte(120)) base=base.div(120).pow(2/5).mul(120)
					if(base.gte(600)) base=base.div(600).pow(0.25).mul(600).mim(10000)
		        return base
            },
             effectDisplay() {
				return upgradeEffect("lv",12) + "Eff Lv"
			 }
		},
	},
    layerShown(){return true}
})
addLayer("Rk", {
    name: "Rank", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Rk", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
    resource: "Rank", // Name of prestige currency
    baseResource: "Lv", // Name of resource prestige is based on
    baseAmount() {return upgradeEffect("lv",12)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "1",
            description: "Rk boost Inf Speed",
            cost: new Decimal("1"),
            effect(){
                return upgradeEffect("Rk",12).add(1)
            },
             effectDisplay() {
				return upgradeEffect("Rk,",11) + "x Inf speed"
            }
		},
        12: {
            title: "2",
            description: "Eff Rk can pass 10",
            cost: new Decimal("10"),
            effect(){
                base = player.Rk.points
				    if(!hasUpgrade('Rk',12)) base=base.min(10)
				    if(base.gte(10)) base=base.div(10).pow(0.5).mul(10)
					if(base.gte(120)) base=base.div(120).pow(0.3).mul(120)
					if(base.gte(600)) base=base.div(600).pow(0.2).mul(600).min(10000)
		        return base
            },
             effectDisplay() {
				return upgradeEffect("Rk",12) + "Eff Rk"
			 }
		},
	},
    layerShown(){return true}
})
