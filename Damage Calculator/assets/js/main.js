// Output views
var naNonCritView, naCritView, naAvgView;
var eNonCritView, eCritView, eAvgView;
var qNonCritView, qCritView, qAvgView;

// Character input views
var charBaseAtk, charBaseHp, charBaseDef, charElementalBonus, charCr, charCd;

// Character talent & const input views
var charNaLvl, charELvl, charQLvl, charC3, charC5;

// Weapon input views
var weaponBaseAtk;
var weaponSubstat, weaponSubstatVal;
var weaponPassive, weaponPassiveVal;

// Artifact input views
var artifactSetEffect, artifactSetEffectVal;
var artifactFlatAtk,
    artifactFlatHp,
    artifactFlatDef,
    artifactAtkPercent,
    artifactHpPercent,
    artifactDefPercent,
    artifactElementalBonus,
    artifactCr,
    artifactCd;

function setRangeSlider(view) {
    view.nextElementSibling.value = view.value;
    var value = ((view.value - view.min) / (view.max - view.min)) * 100;
    view.style.background =
        "linear-gradient(to right, var(--first-color) 0%, var(--first-color) " +
        value +
        "%, #fff " +
        value +
        "%, white 100%)";
}

function setup() {
    // setCharInputViews();
    // setWeaponInputViews();
    // setArtifactInputViews();
    setOutputViews();
}

function getCharInputValues() {
    charBaseAtk = document.getElementById("char-base-atk").value;
    charBaseHp = document.getElementById("char-base-hp").value;
    charBaseDef = document.getElementById("char-base-def").value;
    charElementalBonus = document.getElementById("char-elemental-bonus").value;
    charCr = document.getElementById("char-cr").value;
    charCd = document.getElementById("char-cd").value;

    charNaLvl = document.getElementById("char-na-lvl").value;
    charELvl = document.getElementById("char-skill-lvl").value;
    charQLvl = document.getElementById("char-burst-lvl").value;
    charC3 = document.getElementById("char-has-c3").value;
    charC5 = document.getElementById("char-has-c5").value;
}

function getWeaponInputValues() {
    weaponBaseAtk = document.getElementById("weapon-base-atk").value;
    weaponSubstat = document.getElementById("weapon-substat-selection").value;
    weaponSubstatVal = document.getElementById("weapon-substat-val").value;
    weaponPassive = document.getElementById("weapon-passive-selection").value;
    weaponPassiveVal = document.getElementById("weapon-passive-val").value;
}

function getArtifactInputValues() {
    artifactSetEffect = document.getElementById("set-effect-selection").value;
    artifactSetEffectVal = document.getElementById("set-effect-val").value;
    artifactFlatAtk = document.getElementById("artifacts-atk").value;
    artifactFlatHp = document.getElementById("artifacts-hp").value;
    artifactFlatDef = document.getElementById("artifacts-def").value;
    artifactAtkPercent = document.getElementById("artifacts-atk-percent").value;
    artifactHpPercent = document.getElementById("artifacts-hp-percent").value;
    artifactDefPercent = document.getElementById("artifacts-def-percent").value;
    artifactElementalBonus = document.getElementById(
        "artifacts-elemental-bonus"
    ).value;
    artifactCr = document.getElementById("artifacts-cr").value;
    artifactCd = document.getElementById("artifacts-cd").value;
}

function setOutputViews() {
    naNonCritView = document.getElementById("na-non-crit");
    naCritView = document.getElementById("na-crit");
    naAvgView = document.getElementById("na-avg");
    eNonCritView = document.getElementById("e-non-crit");
    eCritView = document.getElementById("e-crit");
    eAvgView = document.getElementById("e-avg");
    qNonCritView = document.getElementById("q-non-crit");
    qCritView = document.getElementById("q-crit");
    qAvgView = document.getElementById("q-avg");
}

function calculateOutputs() {
    getCharInputValues();
    getWeaponInputValues();
    getArtifactInputValues();

    var baseAtk = charBaseAtk + weaponBaseAtk;
    var atkMultiplier = artifactAtkPercent;
    var flatAtkBonus = artifactFlatAtk;
    var baseHp = charBaseHp;
    var hpMultiplier = artifactHpPercent;
    var flatHpBonus = artifactFlatHp;
    var baseDef = charBaseDef;
    var defMultiplier = artifactDefPercent;
    var flatDefBonus = artifactFlatDef;
    var elemDmgBonus = charElementalBonus;
    var dmgBonus = 0;
    var critRate = charCr + artifactCr;
    var critDmg = charCd + artifactCd;

    var substatVal = weaponSubstatVal;
    switch (weaponSubstat) {
        case "atk":
            atkMultiplier += substatVal;
            break;
        case "hp":
            hpMultiplier += substatVal;
            break;
        case "def":
            defMultiplier += substatVal;
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
        baseAtk *
        (1 + atkMultiplier / 100) *
        (skillMultiplier / 100) *
        (1 + elemDmgBonus / 100);
    var noPassivesCrit = noPassivesNonCrit * (1 + critDmg / 100);
    var noPassivesAvg =
        (critRate / 100) * noPassivesCrit +
        (1 - critRate / 100) * noPassivesNonCrit;

    var passivesNonCrit =
        baseAtk *
        (1 + atkMultiplier / 100 + passivesAtkMultiplier / 100) *
        (skillMultiplier / 100) *
        (1 + elemDmgBonus / 100 + passivesDmgBonus / 100);
    var passivesCrit = passivesNonCrit * (1 + critDmg / 100);
    var passivesAvg =
        (critRate / 100) * passivesCrit +
        (1 - critRate / 100) * passivesNonCrit;

    // Add special multipler dmg
    var specialMultiplier = charSpecialScalingVal.value;
    switch (charSpecialScalingStat.value) {
        case "atk":
            var noPassivesTotalAtk =
                baseAtk * (1 + atkMultiplier / 100) + flatAtkBonus;
            var passivesTotalAtk =
                baseAtk *
                    (1 + atkMultiplier / 100 + passivesAtkMultiplier / 100) +
                flatAtkBonus;
            var noPassivesBonus =
                noPassivesTotalAtk * (specialMultiplier / 100);
            var passivesBonus = passivesTotalAtk * (specialMultiplier / 100);

            noPassivesNonCrit += noPassivesBonus;
            passivesNonCrit += passivesBonus;

            break;
        case "hp":
            var noPassivesTotalHp =
                baseHp * (1 + hpMultiplier / 100) + flatHpBonus;
            var passivesTotalHp =
                baseHp * (1 + hpMultiplier / 100 + passivesHpMultiplier / 100) +
                flatHpBonus;
            var noPassivesBonus = noPassivesTotalHp * (specialMultiplier / 100);
            var passivesBonus = passivesTotalHp * (specialMultiplier / 100);

            noPassivesNonCrit += noPassivesBonus;
            passivesNonCrit += passivesBonus;

            break;
        case "def":
            var noPassivesTotalDef =
                baseDef * (1 + defMultiplier / 100) + flatDefBonus;
            var passivesTotalDef =
                baseDef *
                    (1 + defMultiplier / 100 + passivesDefMultiplier / 100) +
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
