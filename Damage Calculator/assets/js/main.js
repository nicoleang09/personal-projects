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
    artifactSetEffect = document.getElementById("2set-effect-selection").value;
    artifactSetEffectVal = document.getElementById("2set-effect-val").value;
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

    var baseAtk = +charBaseAtk + +weaponBaseAtk;
    var atkMultiplier = +artifactAtkPercent;
    var flatAtkBonus = +artifactFlatAtk;
    var baseHp = +charBaseHp;
    var hpMultiplier = +artifactHpPercent;
    var flatHpBonus = +artifactFlatHp;
    var baseDef = +charBaseDef;
    var defMultiplier = +artifactDefPercent;
    var flatDefBonus = +artifactFlatDef;
    var elemDmgBonus = +charElementalBonus;
    var dmgBonus = 0;
    var critRate = +charCr + +artifactCr;
    var critDmg = +charCd + +artifactCd;

    switch (weaponSubstat) {
        case "atk":
            atkMultiplier += +weaponSubstatVal;
            break;
        case "hp":
            hpMultiplier += +weaponSubstatVal;
            break;
        case "def":
            defMultiplier += +weaponSubstatVal;
            break;
        case "crit-rate":
            critRate += +weaponSubstatVal;
            break;
        case "crit-dmg":
            critDmg += +weaponSubstatVal;
            break;
        case "em":
            break;
        case "er":
            break;
        default:
            break;
    }

    switch (weaponPassive) {
        case "atk":
            atkMultiplier += +weaponPassiveVal;
            break;
        case "hp":
            hpMultiplier += +weaponPassiveVal;
            break;
        case "def":
            defMultiplier += +weaponPassiveVal;
            break;
        case "dmg-bonus":
            dmgBonus += +weaponPassiveVal;
            break;
        default:
            break;
    }

    switch (artifactSetEffect) {
        case "atk":
            atkMultiplier += +artifactSetEffectVal;
            break;
        case "hp":
            hpMultiplier += +artifactSetEffectVal;
            break;
        case "def":
            defMultiplier += +artifactSetEffectVal;
            break;
        case "dmg-bonus":
            dmgBonus += +artifactSetEffectVal;
            break;
        case "elem-dmg-bonus":
            elemDmgBonus += +artifactSetEffectVal;
            break;
        default:
            break;
    }

    var totalAtk = baseAtk * (1 + atkMultiplier / 100);
    var totalHp = baseHp * (1 + hpMultiplier / 100);
    var totalDef = baseDef * (1 + defMultiplier / 100);
    var totalENonCrit = totalAtk * (1 + elemDmgBonus / 100 + dmgBonus / 100);
    var totalECrit = totalENonCrit * (1 + critDmg / 100);
    var totalEAvg =
        (critRate / 100) * totalECrit + (1 - critRate / 100) * totalENonCrit;

    eNonCritView.innerText = totalENonCrit;
    eCritView.innerText = totalECrit;
    eAvgView.innerText = totalEAvg;

    // qNonCritView.innerText = totalQNonCrit;
    // qCritView.innerText = totalQCrit;
    // qAvgView.innerText = totalQAvg;
}
