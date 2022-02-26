class ArtifactSetEffect {
    name;
    twoSetEffect;
    twoSetValue;
    fourSetEffect;
    fourSetValue;

    constructor(name, twoSetEffect, twoSetValue, fourSetEffect, fourSetValue) {
        this.name = name;
        this.twoSetEffect = twoSetEffect;
        this.twoSetValue = twoSetValue;
        this.fourSetEffect = fourSetEffect;
        this.fourSetValue = fourSetValue;
    }
}

var artifactSetMap = {};

artifactSetMap["glad"] = new ArtifactSetEffect(
    "Gladiator's Finale",
    "atk",
    18,
    "na-dmg-bonus",
    35
);
artifactSetMap["maiden"] = new ArtifactSetEffect(
    "Maiden's Beloved",
    "healing-bonus",
    15,
    "healing-bonus",
    20
);
artifactSetMap["noblesse"] = new ArtifactSetEffect(
    "Noblesse Oblige",
    "burst-dmg-bonus",
    20,
    "atk",
    20
);
artifactSetMap["bloodstained"] = new ArtifactSetEffect(
    "Bloodstained Chivalry",
    "phy-dmg-bonus",
    25,
    "ca-dmg-bonus",
    50
);
artifactSetMap["wanderer"] = new ArtifactSetEffect(
    "Wanderer's Troupe",
    "em",
    80,
    "ca-dmg-bonus",
    35
);
artifactSetMap["vv"] = new ArtifactSetEffect(
    "Viridescent Venerer",
    "elem-dmg-bonus",
    15,
    "rxn-dmg-bonus",
    60
);
artifactSetMap["tf"] = new ArtifactSetEffect(
    "Thundering Fury",
    "elem-dmg-bonus",
    15,
    "rxn-dmg-bonus",
    40
);
artifactSetMap["ts"] = new ArtifactSetEffect(
    "Thundersoother",
    "elem-res",
    40,
    "dmg-bonus",
    35
);
artifactSetMap["cwof"] = new ArtifactSetEffect(
    "Crimson Witch of Flames",
    "elem-dmg-bonus",
    15,
    "rxn-dmg-bonus",
    40
);
artifactSetMap["lavawalker"] = new ArtifactSetEffect(
    "Lavawalker",
    "elem-res",
    40,
    "dmg-bonus",
    35
);
artifactSetMap["archaic"] = new ArtifactSetEffect(
    "Archaic Petra",
    "elem-dmg-bonus",
    15,
    "dmg-bonus",
    35
);
artifactSetMap["bolide"] = new ArtifactSetEffect(
    "Retracing Bolide",
    "shield-strength",
    35,
    "na-ca-dmg-bonus",
    40
);
artifactSetMap["hod"] = new ArtifactSetEffect(
    "Heart of Depth",
    "elem-dmg-bonus",
    15,
    "na-ca-dmg-bonus",
    30
);

console.log("artifactSetMap: ", artifactSetMap);
