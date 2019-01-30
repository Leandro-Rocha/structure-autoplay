const AutoplayTab = Template({
    _init() {
        this.dvDisplay = createElement("div", "stardust tab hidden", this.parent);
        this.dvAutoPlayTitle = createElement("div", "stardust-title", this.dvDisplay, "Autoplay Options");
        this.dvAutoAttack = createElement("div", "stardust-growth", this.dvDisplay);
        this.dvEnchantNodes = createElement("div", "stardust-growth", this.dvDisplay);
        this.dvSummonClones = createElement("div", "stardust-growth", this.dvDisplay);
        this.dvFarmMaps = createElement("div", "stardust-growth", this.dvDisplay);
        this.dvDispelShiels = createElement("div", "stardust-growth", this.dvDisplay);

        let masterContainer = this;

        /***********************
        * Auto Attack
        ***********************/
        this.cbAutoAttack = GuiCheckbox({
            parent: this.dvAutoAttack,
            title: "Module: Auto Attack",
            container: game.automation.autoplay.modules,
            value: "autoattack"
        });

        createElement("div", "text", this.dvAutoAttack, "Maximum ETA:")

        this.maxETASlider = GuiSlider({
            parent: this.dvAutoAttack,
            container: game.automation.autoplay,
            leftText: "0",
            rightText: "120m",
            value: "maxETA",
            max: 120,
            min: 0,
            steps: 100,
            digits: 0,
            className: "automation"
        });

        createElement("div", "text", this.dvAutoAttack, "Mine time:")

        this.goldMineTimeSlider = GuiSlider({
            parent: this.dvAutoAttack,
            container: game.automation.autoplay,
            leftText: "0",
            rightText: "120m",
            value: "mineTime",
            max: 120,
            min: 0,
            steps: 100,
            digits: 0,
            className: "automation"
        });

        /***********************
        * Enchant Nodes
        ***********************/
        this.cbAutoAttack = GuiCheckbox({
            parent: this.dvEnchantNodes,
            title: "Module: Enchant Nodes",
            container: game.automation.autoplay.modules,
            value: "enchantNodes"
        });

        this.dvEnchantSelector = createElement("div", "selectors", this.dvEnchantNodes)

        this.pkEnchantSelector = ListPicker({
            parent: this.dvEnchantSelector,
            container: game.automation.autoplay.enchantNodes,
            className: "selector",
            value: "enchantType",
            name: "Focus",
            values: Object.keys(SPELLS).filter(e => e.includes("enchant")),
            texts: Object.keys(SPELLS).filter(e => e.includes("enchant")).map(e => SPELLS[e].name),
            expanded: false,
            onSet: () => {
                this.pkEnchantSelector.expanded = !this.pkEnchantSelector.expanded && this.pkEnchantSelector.same
                if (this.pkEnchantSelector.expanded) {
                    this.pkEnchantSelector.buttons.map((x, n) => {
                        if (n != this.pkEnchantSelector.index)
                            x.dvDisplay.style.top = -25 * (this.pkEnchantSelector.index - n) + "px"
                        x.dvDisplay.style.height = "15px"
                    })
                } else {
                    this.pkEnchantSelector.buttons.map((x, n) => {
                        x.dvDisplay.style.height = (this.pkEnchantSelector.index == n) ? "15px" : 0
                        x.dvDisplay.style.top = 0
                    })
                }
            },
        })

        this.dvEnchantSelector.onmouseleave = (event) => {
            if (!this.pkEnchantSelector.expanded) return
            this.pkEnchantSelector.buttons.map((x, n) => {
                x.dvDisplay.style.height = (this.pkEnchantSelector.index == n) ? "15px" : 0
                x.dvDisplay.style.top = 0
            })
            this.pkEnchantSelector.expanded = false
        }

        this.txtNodesToEnchant = createElement("div", "text", this.dvEnchantNodes, "Nodes to enchant: ");







        /***********************
        * Summon Clones
        ***********************/
        this.cbAutoAttack = GuiCheckbox({
            parent: this.dvSummonClones,
            title: "Module: Summon Clones",
            container: game.automation.autoplay.modules,
            value: "summonClones"
        });

        /***********************
        * Farm Maps
        ***********************/
        this.cbAutoAttack = GuiCheckbox({
            parent: this.dvFarmMaps,
            title: "Module: Farm Maps",
            container: game.automation.autoplay.modules,
            value: "farmMaps"
        });

        createElement("div", "text", this.dvFarmMaps, "Map level N-X:")

        this.farmMapLevelSlider = GuiSlider({
            parent: this.dvFarmMaps,
            container: game.automation.autoplay,
            leftText: "0",
            rightText: "14",
            value: "farmMapMinusLevel",
            max: 14,
            min: 0,
            shortStep: 1,
            steps: 100,
            digits: 0,
            onSet() {
                masterContainer.update(true);
            },
            className: "automation"
        });

        this.txtMapFarmLevel = createElement("div", "text", this.dvFarmMaps, "Result: ");

        /***********************
        * Summon Clones
        ***********************/
        this.cbAutoAttack = GuiCheckbox({
            parent: this.dvDispelShiels,
            title: "Module: Dispel Shiels",
            container: game.automation.autoplay.modules.dispelShields,
            value: "enabled"
        });

        this.cbAutoAttack = GuiCheckbox({
            parent: this.dvDispelShiels,
            title: "Dispel Physical",
            container: game.automation.autoplay.modules.dispelShields,
            value: "dispelPhysical"
        });

        this.cbAutoAttack = GuiCheckbox({
            parent: this.dvDispelShiels,
            title: "Dispel Magical",
            container: game.automation.autoplay.modules.dispelShields,
            value: "dispelMagical"
        });


        this.update();
    },

    onSet() {
        this.update(true);
    },


    update(forced) {
        this.cbAutoAttack.update();
        this.maxETASlider.update();
        this.goldMineTimeSlider.update();
        this.farmMapLevelSlider.update();
        this.pkEnchantSelector.update();

        this.txtNodesToEnchant.innerText = "Nodes to enchant: " + game.map.points.filter((node) => { return !node.enchanted && !node.mineDepth }).length;
        this.txtMapFarmLevel.innerText = "Result: " + (game.realMap.level - Math.floor(game.automation.autoplay.farmMapMinusLevel));
    }
});