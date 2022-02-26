class ArtifactSetEffect {
    name;
    twoSetEffect;
    twoSetValue;
    fourSetEffect;
    fourSetValue;

    ArtifactSetEffect(
        name,
        twoSetEffect,
        twoSetValue,
        fourSetEffect,
        fourSetValue
    ) {
        this.name = name;
        this.twoSetEffect = twoSetEffect;
        this.twoSetValue = twoSetValue;
        this.fourSetEffect = fourSetEffect;
        this.fourSetValue = fourSetValue;
    }
}

class ArtifactSets {
    static artifactSetMap = new Map();

    artifactSetMap["glad"] = new ArtifactSetEffect("glad", "atk", 18, "na-dmg-bonus", 35);
    artifactSetMap["maiden"] = new ArtifactSetEffect(
        "maiden",
        "healing-bonus",
        15,
        "healing-bonus",
        20
    );
    artifactSetMap["noblesse"] = new ArtifactSetEffect(
        "noblesse",
        "burst-dmg-bonus",
        20,
        "atk",
        20
    );
    artifactSetMap["bloodstained"] = new ArtifactSetEffect("bloodstained", "phy-dmg-bonus", 25, "ca-dmg-bonus", 50);
    artifactSetMap["wanderer"] = new ArtifactSetEffect("wanderer", "em", 80, "ca-dmg-bonus", 35);
    artifactSetMap["vv"] = new ArtifactSetEffect("vv", "elem-dmg-bonus", 15, "rxn-dmg-bonus", 60);
    artifactSetMap["tf"] = new ArtifactSetEffect("tf", "elem-dmg-bonus", 15, "rxn-dmg-bonus", 40);
    artifactSetMap["ts"] = new ArtifactSetEffect("ts", "elem-res", 40, "dmg-bonus", 35);
    artifactSetMap["cwof"] = new ArtifactSetEffect("cwof", "elem-dmg-bonus", 15, "rxn-dmg-bonus", 40);
    artifactSetMap["lavawalker"] = new ArtifactSetEffect("lavawalker", "elem-res", 40, "dmg-bonus", 35);
    artifactSetMap["archaic"] = new ArtifactSetEffect("archaic", "elem-dmg-bonus", 15, "dmg-bonus", 35);
    artifactSetMap["bolide"] = new ArtifactSetEffect("bolide", "shield-strength", 35, "na-ca-dmg-bonus", 40);
    artifactSetMap["hod"] = new ArtifactSetEffect("hod", "elem-dmg-bonus", 15, "na-ca-dmg-bonus", 30);

}
