// Output views
var noPassivesNonCritView;
var noPassivesCritView;
var noPassivesAvgView;
var passivesNonCritView;
var passivesCritView;
var passivesAvgView;

// Character input views
var charBaseAtk;
var charBaseHp;
var charBaseDef;
var charBaseElementalBonus;
var charBaseCr;
var charBaseCd;
var charTalentDmgMultiplier;
var charSpecialScalingStat;
var charSpecialScalingVal;

// Weapon input views
var weaponBaseAtk;
var weaponSubstat;
var weaponSubstatVal;
var weaponPassive;
var weaponPassiveVal;

// Artifact input views
var artifactSetEffect;
var artifactSetEffectVal;
var artifactFlatAtk;
var artifactFlatHp;
var artifactFlatDef;
var artifactAtkPercent;
var artifactHpPercent;
var artifactDefPercent;
var artifactElementalBonus;
var artifactCr;
var artifactCd;

function setAllViews() {
    setCharInputViews();
    setWeaponInputViews();
    setArtifactInputViews();
    setOutputViews();
}

function setCharInputViews() {
    charBaseAtk = document.getElementById("char-base-atk");
    charBaseHp = document.getElementById("char-base-hp");
    charBaseDef = document.getElementById("char-base-def");
    charBaseElementalBonus = document.getElementById("char-elemental-bonus");
    charBaseCr = document.getElementById("char-cr");
    charBaseCd = document.getElementById("char-cd");
    charTalentDmgMultiplier = document.getElementById("char-talent-multiplier");
    charSpecialScalingStat = document.getElementById(
        "char-special-scaling-selection"
    );
    charSpecialScalingVal = document.getElementById("char-special-scaling-val");
}

function setWeaponInputViews() {
    weaponBaseAtk = document.getElementById("weapon-base-atk");
    weaponSubstat = document.getElementById("weapon-substat-selection");
    weaponSubstatVal = document.getElementById("weapon-substat-val");
    weaponPassive = document.getElementById("weapon-passive-selection");
    weaponPassiveVal = document.getElementById("weapon-passive-val");
}

function setArtifactInputViews() {
    artifactSetEffect = document.getElementById("set-effect-selection");
    artifactSetEffectVal = document.getElementById("set-effect-val");
    artifactFlatAtk = document.getElementById("artifacts-atk");
    artifactFlatHp = document.getElementById("artifacts-hp");
    artifactFlatDef = document.getElementById("artifacts-def");
    artifactAtkPercent = document.getElementById("artifacts-atk-percent");
    artifactHpPercent = document.getElementById("artifacts-hp-percent");
    artifactDefPercent = document.getElementById("artifacts-def-percent");
    artifactElementalBonus = document.getElementById(
        "artifacts-elemental-bonus"
    );
    artifactCr = document.getElementById("artifacts-cr");
    artifactCd = document.getElementById("artifacts-cd");
}

function setOutputViews() {
    noPassivesNonCritView = document.getElementById("no-passives-non-crit");
    noPassivesCritView = document.getElementById("no-passives-crit");
    noPassivesAvgView = document.getElementById("no-passives-avg");
    passivesNonCritView = document.getElementById("passives-non-crit");
    passivesCritView = document.getElementById("passives-crit");
    passivesAvgView = document.getElementById("passives-avg");
}

function calculateOutputs() {
    var totalBaseAtk = charBaseAtk.value + weaponBaseAtk.value;
    var baseAtkMultiplier = artifactAtkPercent.value;
    var flatAtkBonus = artifactFlatAtk.value;
    var passivesAtkMultiplier = 0;
    var totalBaseHp = charBaseHp.value + artifactFlatHp.value;
    var baseHpMultiplier = artifactHpPercent.value;
    var flatHpBonus = artifactFlatHp.value;
    var passivesHpMultiplier = 0;
    var totalBaseDef = charBaseDef.value + artifactFlatDef.value;
    var baseDefMultiplier = artifactDefPercent.value;
    var flatDefBonus = artifactFlatDef.value;
    var passivesDefMultiplier = 0;
    var baseDmgBonus = charBaseElementalBonus.value;
    var passivesDmgBonus = 0;
    var critRate = charBaseCr.value + artifactCr.value;
    var critDmg = charBaseCd.value + artifactCd.value;
    var skillMultiplier = charTalentDmgMultiplier.value;

    var substatVal = weaponSubstatVal.value;
    switch (weaponSubstat.value) {
        case "atk":
            baseAtkMultiplier += substatVal;
            break;
        case "hp":
            baseHpMultiplier += substatVal;
            break;
        case "def":
            baseDefMultiplier += substatVal;
            break;
        case "crit-rate":
            critRate += substatVal;
            break;
        case "crit-dmg":
            critDmg += substatVal;
            break;
        case "em":
            break;
        case "er":
            break;
        default:
            break;
    }

    var weaponPassiveValue = weaponPassiveVal.value;
    switch (weaponPassive.value) {
        case "atk":
            passivesAtkMultiplier += weaponPassiveValue;
            break;
        case "hp":
            passivesHpMultiplier += weaponPassiveValue;
            break;
        case "def":
            passivesDefMultiplier += weaponPassiveValue;
            break;
        case "dmg-bonus":
            passivesDmgBonus += weaponPassiveValue;
            break;
        default:
            break;
    }

    var artifactPassiveVal = artifactSetEffectVal.value;
    switch (artifactSetEffect.value) {
        case "atk":
            passivesAtkMultiplier += artifactPassiveVal;
            break;
        case "hp":
            passivesHpMultiplier += artifactPassiveVal;
            break;
        case "def":
            passiveDefMultiplier += artifactPassiveVal;
            break;
        case "dmg-bonus":
            passivesDmgBonus += artifactPassiveVal;
            break;
        default:
            break;
    }

    var noPassivesNonCrit =
        totalBaseAtk *
        (1 + baseAtkMultiplier / 100) *
        (skillMultiplier / 100) *
        (1 + baseDmgBonus / 100);
    var noPassivesCrit = noPassivesNonCrit * (1 + critDmg / 100);
    var noPassivesAvg =
        (critRate / 100) * noPassivesCrit +
        (1 - critRate / 100) * noPassivesNonCrit;

    var passivesNonCrit =
        totalBaseAtk *
        (1 + baseAtkMultiplier / 100 + passivesAtkMultiplier / 100) *
        (skillMultiplier / 100) *
        (1 + baseDmgBonus / 100 + passivesDmgBonus / 100);
    var passivesCrit = passivesNonCrit * (1 + critDmg / 100);
    var passivesAvg =
        (critRate / 100) * passivesCrit +
        (1 - critRate / 100) * passivesNonCrit;

    // Add special multipler dmg
    var specialMultiplier = charSpecialScalingVal.value;
    switch (charSpecialScalingStat.value) {
        case "atk":
            var noPassivesTotalAtk =
                totalBaseAtk * (1 + baseAtkMultiplier / 100) + flatAtkBonus;
            var passivesTotalAtk =
                totalBaseAtk *
                    (1 +
                        baseAtkMultiplier / 100 +
                        passivesAtkMultiplier / 100) +
                flatAtkBonus;
            var noPassivesBonus =
                noPassivesTotalAtk * (specialMultiplier / 100);
            var passivesBonus = passivesTotalAtk * (specialMultiplier / 100);

            noPassivesNonCrit += noPassivesBonus;
            passivesNonCrit += passivesBonus;

            break;
        case "hp":
            var noPassivesTotalHp =
                totalBaseHp * (1 + baseHpMultiplier / 100) + flatHpBonus;
            var passivesTotalHp =
                totalBaseHp *
                    (1 + baseHpMultiplier / 100 + passivesHpMultiplier / 100) +
                flatHpBonus;
            var noPassivesBonus = noPassivesTotalHp * (specialMultiplier / 100);
            var passivesBonus = passivesTotalHp * (specialMultiplier / 100);

            noPassivesNonCrit += noPassivesBonus;
            passivesNonCrit += passivesBonus;

            break;
        case "def":
            var noPassivesTotalDef =
                totalBaseDef * (1 + baseDefMultiplier / 100) + flatDefBonus;
            var passivesTotalDef =
                totalBaseDef *
                    (1 +
                        baseDefMultiplier / 100 +
                        passivesDefMultiplier / 100) +
                flatDefBonus;
            var noPassivesBonus =
                noPassivesTotalDef * (specialMultiplier / 100);
            var passivesBonus = passivesTotalDef * (specialMultiplier / 100);

            noPassivesNonCrit += noPassivesBonus;
            passivesNonCrit += passivesBonus;

            break;
        default:
            break;
    }

    noPassivesNonCritView.innerText = noPassivesNonCrit;
    noPassivesCritView.innerText = noPassivesCrit;
    noPassivesAvgView.innerText = noPassivesAvg;
    passivesNonCritView.innerText = passivesNonCrit;
    passivesCritView.innerText = passivesCrit;
    passivesAvgView.innerText = passivesAvg;
}
