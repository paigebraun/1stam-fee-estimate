function MICalculator(ltv: number, creditScore: string): number {
    const ltvCategories = [
        [97, 95.01], [95, 90.01], [90, 85.01], [85, 80.01], [80, 0]
    ];
    const creditScoreCategories = ["760+", "740-759", "720-739", "700-719", "680-699", "660-679", "640-659", "620-639"];

    const MIpercentages: number[][] = [
        [0.58, 0.70, 0.87, 0.99, 1.21, 1.54, 1.65, 1.86],
        [0.38, 0.53, 0.66, 0.78, 0.96, 1.28, 1.33, 1.42],
        [0.28, 0.38, 0.46, 0.55, 0.65, 0.90, 0.91, 0.94],
        [0.19, 0.20, 0.23, 0.25, 0.28, 0.38, 0.40, 0.44],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // Find the LTV category
    let ltvCategoryIndex = -1;
    for (let i = 0; i < ltvCategories.length; i++) {
        const [upperBound, lowerBound] = ltvCategories[i];
        if (ltv <= upperBound && ltv > lowerBound) {
            ltvCategoryIndex = i;
            break;
        }
    }

    // Find the credit score category index
    const creditScoreCategoryIndex = creditScoreCategories.indexOf(creditScore);

    // If both indexes are found, return the percentage value
    if (ltvCategoryIndex !== -1 && creditScoreCategoryIndex !== -1) {
        return MIpercentages[ltvCategoryIndex][creditScoreCategoryIndex];
    }

    return 0; // Return undefined if either index is not found
}

export default MICalculator;
