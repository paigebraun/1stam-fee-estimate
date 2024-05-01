import { FundingFeeTable } from "./types";

const fundingFeeTable: FundingFeeTable = {
    "First Use": {
        1: [
            { minDownPayment: 0, maxDownPayment: 5, vaFundingFeePercentage: 2.30 },
            { minDownPayment: 5, maxDownPayment: 9.99, vaFundingFeePercentage: 1.65 },
            { minDownPayment: 10, maxDownPayment: 100, vaFundingFeePercentage: 1.40 }
        ]
    },
    "Subsequent Use": {
        1: [
            { minDownPayment: 0, maxDownPayment: 5, vaFundingFeePercentage: 3.60 },
            { minDownPayment: 5, maxDownPayment: 9.99, vaFundingFeePercentage: 1.65 },
            { minDownPayment: 10, maxDownPayment: 100, vaFundingFeePercentage: 1.40 }
        ]
    }
};

function calculateVAFundingFee(vaFundingFeeStatus: string, downPaymentPercent: number): number {
    const categories = fundingFeeTable[vaFundingFeeStatus];
    if (!categories) return 0;

    for (const category in categories) {
        const ranges = categories[category];
        for (const range of ranges) {
            if (downPaymentPercent >= range.minDownPayment && downPaymentPercent <= range.maxDownPayment) {
                return range.vaFundingFeePercentage;
            }
        }
    }

    return 0; // Return 0 if the VA funding fee percentage cannot be determined
}

export default calculateVAFundingFee;
