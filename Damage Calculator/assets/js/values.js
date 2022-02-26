class MultiplierValues {
    static qLvl6 = 77.02;
    static qLvl7 = 82.53;
    static qLvl8 = 88.03;
    static qLvl9 = 93.53;
    static qLvl10 = 104.53;

    static getSkill3HitMultiplier(level) {
        switch (level) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                return 94.38;
            case 7:
                return 102.68;
            case 8:
                return 110.99;
            case 9:
                return 119.29;
            case 10:
                return 128.35;
            default:
                return 1;
        }
    }

    static getWaveflashMultiplier(level) {
        switch (level) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                return 0.82 * 4;
            case 7:
                return 0.89 * 4;
            case 8:
                return 0.96 * 4;
            case 9:
                return 1.03 * 4;
            case 10:
                return 1.11 * 4;
            default:
                return 1;
        }
    }
}
