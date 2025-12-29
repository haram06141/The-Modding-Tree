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
					if(hasUpgrade('lv',13)) base=base.add(100)
				    if(!hasUpgrade('lv',12)) base=base.min(50)
					if(hasUpgrade('Rk',12)) base=base.add(player.Rk.points)
				    if(base.gte(50)) base=base.div(50).pow(2/3).mul(50)
					if(base.gte(120)) base=base.div(120).pow(2/5).mul(120)
					if(base.gte(600)) base=base.div(600).pow(0.25).mul(600).min(10000)
					if(hasUpgrade('lv',12)) base=base.add(50).min(player.lv.points)
					if(hasUpgrade('v',12)) base=base.add(upgradeEffect("v",12))
		        return base
            },
             effectDisplay() {
				return upgradeEffect("lv",12) + "Eff Lv"
			 }
		},
        13: {
            title: "3",
            description: "Eff lv boost Inf grow base",
            cost: new Decimal("100"),
            effect(){
                base = upgradeEffect("lv",12).add(100)
				base = base.div(3).pow(base.pow(1/3))
				    if(!hasUpgrade('lv',13)) base=base.pow(0)
		        return base
            },
             effectDisplay() {
				return upgradeEffect("lv",13) + "xbase"
			 }
		},
        14: {
            title: "4",
            description: "Inf gain^1.025",
            cost: new Decimal("44444"),
            effect(){
		        return true
            },
             effectDisplay() {
				return "^1.025 Inf gain"
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "1",
            description: "Rk boost Inf Speed,Inf gain^1.15",
            cost: new Decimal("4"),
            effect(){
                return upgradeEffect("Rk",12).add(1)
            },
             effectDisplay() {
				return upgradeEffect("Rk",11) + "x Inf speed"
            }
		},
        12: {
            title: "2",
            description: "Eff Rk can pass 10,Rk add Lv amount",
            cost: new Decimal("10"),
            effect(){
                base = player.Rk.points
				    if(!hasUpgrade('Rk',12)) base=base.min(10)
				    if(base.gte(10)) base=base.div(10).pow(0.5).mul(10)
					if(base.gte(120)) base=base.div(120).pow(0.3).mul(120)
					if(base.gte(600)) base=base.div(600).pow(0.2).mul(600).min(10000)
					if(hasUpgrade('Rk',12)) base=base.add(10).min(player.Rk.points)
		        return base
            },
             effectDisplay() {
				return upgradeEffect("Rk",12) + "Eff Rk"
			 }
		},
	},
    layerShown(){return true}
})
addLayer("v", {
    name: "Neutrino", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ν", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "ν", // Name of prestige currency
    baseResource: "Lv", // Name of resource prestige is based on
    baseAmount() {return upgradeEffect("lv",12)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = upgradeEffect("Rk",12).add(1).pow(0.5).mul(10)
		mult = mult.mul(upgradeEffect("Te",12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "1",
            description: "ν boost Inf Speed",
            cost: new Decimal("1"),
            effect(){
                return player.v.points.pow(1/3).add(1)
            },
             effectDisplay() {
				return upgradeEffect("v",11) + "x Inf speed"
            }
		},
        12: {
            title: "2",
            description: "ν boost Eff lv",
            cost: new Decimal("10"),
            effect(){
                base = player.v.points.pow(0.5).add(10)
				    if(!hasUpgrade('v',12)) base=base.min(0)
				    if(base.gte(50)) base=base.div(50).pow(0.5).mul(50)
					if(base.gte(200)) base=base.div(200).pow(0.4).mul(200)
					if(base.gte(100000)) base=base.div(100000).pow(0.25).mul(100000).min(1e7)
		        return base
            },
             effectDisplay() {
				return upgradeEffect("v",12) + "+Eff lv"
			 }
		},
	},
    layerShown(){return true}
})
addLayer("Te", {
    name: "Tier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ti", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "Tier", // Name of prestige currency
    baseResource: "Rk", // Name of resource prestige is based on
    baseAmount() {return upgradeEffect("Rk",12)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		    if(!hasUpgrade("Rk",12)) mult=mult.mul(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "1",
            description: "Tier boost Inf Speed,Inf gain^1.15",
            cost: new Decimal("1"),
            effect(){
                return upgradeEffect("Te",12).pow(1.5).add(1)
            },
             effectDisplay() {
				return upgradeEffect("Te",11) + "x Inf speed"
            }
		},
        12: {
            title: "2",
            description: "Eff Tier can pass 5",
            cost: new Decimal("10"),
            effect(){
                base = player.Te.points
				    if(!hasUpgrade('Te',12)) base=base.min(5)
				    if(base.gte(5)) base=base.div(5).pow(0.35).mul(5)
					if(base.gte(30)) base=base.div(30).pow(0.25).mul(30)
					if(base.gte(60) base=base.div(60).pow(0.15).mul(60).min(100)
					if(hasUpgrade('Te',12)) base=base.add(5).min(player.Te.points)
		        return base
            },
             effectDisplay() {
				return upgradeEffect("Te",12) + "Eff Tier"
			 }
		},
	},
    layerShown(){return true}
})
