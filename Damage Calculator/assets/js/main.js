// Character input views
var charBaseAtk, charBaseHp, charBaseDef, charElementalBonus, charCr, charCd;

// Character talent & const input views
var charNaLvl, charELvl, charQLvl, charC3, charC5;

// Weapon input views
var weaponBaseAtk;
var weaponSubstat, weaponSubstatVal;
var weaponPassive, weaponPassiveVal;

// Artifact input views
var artifact2Set1;
var artifact2Set2;
var artifactFlatAtk,
    artifactFlatHp,
    artifactFlatDef,
    artifactAtkPercent,
    artifactHpPercent,
    artifactDefPercent,
    artifactElementalBonus,
    artifactCr,
    artifactCd;

function setUp() {
    setArtifactSets();
}

function setArtifactSets() {
    // console.log("setting up artifact sets");
    var artifactSets = Object.keys(artifactSetMap);
    // console.log("artifact set keys: ", artifactSets);

    for (let index in artifactSets) {
        var artifactSet = artifactSets[index];
        // console.log("artifact set name: " + artifactSet);

        var option = document.createElement("option");
        option.value = artifactSet;
        option.innerText = artifactSetMap[artifactSet].name;

        document.getElementById("2set-effect-selection").appendChild(option);
        document
            .getElementById("4set-effect-selection")
            .appendChild(option.cloneNode(true));
    }
}

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
    artifact2SetEffect = document.getElementById("2set-effect-selection").value;
    artifact2SetEffectVal = document.getElementById("2set-effect-val").value;
    artifact4SetEffect = document.getElementById("4set-effect-selection").value;
    artifact4SetEffectVal = document.getElementById("4set-effect-val").value;
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

    switch (artifact2SetEffect) {
        case "atk":
            atkMultiplier += +artifact2SetEffectVal;
            break;
        case "hp":
            hpMultiplier += +artifact2SetEffectVal;
            break;
        case "def":
            defMultiplier += +artifact2SetEffectVal;
            break;
        case "dmg-bonus":
            dmgBonus += +artifact2SetEffectVal;
            break;
        case "elem-dmg-bonus":
            elemDmgBonus += +artifact2SetEffectVal;
            break;
        default:
            break;
    }

    switch (artifact4SetEffect) {
        case "atk":
            atkMultiplier += +artifact4SetEffectVal;
            break;
        case "hp":
            hpMultiplier += +artifact4SetEffectVal;
            break;
        case "def":
            defMultiplier += +artifact4SetEffectVal;
            break;
        case "dmg-bonus":
            dmgBonus += +artifact4SetEffectVal;
            break;
        case "elem-dmg-bonus":
            elemDmgBonus += +artifact4SetEffectVal;
            break;
        default:
            break;
    }

    console.log(MultiplierValues.getSkill3HitMultiplier(+charELvl));

    var totalAtk = baseAtk * (1 + atkMultiplier / 100);
    var totalHp = baseHp * (1 + hpMultiplier / 100);
    var totalDef = baseDef * (1 + defMultiplier / 100);
    var totalENonCrit =
        totalAtk *
            (1 + MultiplierValues.getSkill3HitMultiplier(+charELvl) / 100) *
            (1 + elemDmgBonus / 100 + dmgBonus / 100) +
        (MultiplierValues.getWaveflashMultiplier(+charELvl) / 100) * totalHp;
    var totalECrit = totalENonCrit * (1 + critDmg / 100);
    var totalEAvg =
        (critRate / 100) * totalECrit + (1 - critRate / 100) * totalENonCrit;
}

function fillTableData() {
    var naViewIds = [
        "na1",
        "na2",
        "na3",
        "na4",
        "na5",
        "nacharged",
        "naplunge",
    ];

    var eViewIds = ["e1", "e2", "e3", "ewaveflash", "eillussion"];

    var qViewIds = ["q"];
}
