export function calculatePresentValueWithoutAPR(PMT: number, fees: number, numPayments: number, loanAmountMinusFees: number): number {
    let presentValue: number = 0;

    // Calculate present value of each cash flow (payment)
    for (let i = 1; i <= numPayments; i++) {
        presentValue += PMT / Math.pow(1 + i, numPayments);
    }

    // Add present value of fees
    presentValue += fees / Math.pow(1 + numPayments, numPayments);

    // Add present value of loan amount minus fees
    presentValue += loanAmountMinusFees;

    return presentValue;
}

export function calculateAPR(nper: number, pmt: number, pv: number, fv?: number, type?: number, guess?: number): number | null {
    fv = typeof fv !== 'undefined' ? fv : 0;
    type = typeof type !== 'undefined' ? type : 0;
    guess = typeof guess !== 'undefined' ? guess : 0.1;

    // Sets the limits for possible guesses between 0% and 100%
    let lowLimit = 0;
    let highLimit = 1;

    // Defines a tolerance for convergence
    const tolerance = Math.abs(0.00000005 * pmt);

    // Tries at most 40 times to find a solution within the tolerance
    for (let i = 0; i < 40; i++) {
        // Resets the balance to the original pv
        let balance = pv;

        // Calculates the balance at the end of the loan based on loan conditions
        for (let j = 0; j < nper; j++) {
            if (type === 0) {
                // Interests applied before payment
                balance = balance * (1 + guess) + pmt;
            } else {
                // Payments applied before interests
                balance = (balance + pmt) * (1 + guess);
            }
        }

        // Returns the guess if balance is within tolerance
        if (Math.abs(balance + fv) < tolerance) {
            return guess * 12; // Convert to annual rate
        } else if (balance + fv > 0) {
            // Sets a new highLimit knowing that the current guess was too big
            highLimit = guess;
        } else {
            // Sets a new lowLimit knowing that the current guess was too small
            lowLimit = guess;
        }

        // Calculates the new guess
        guess = (highLimit + lowLimit) / 2;
    }

    // Returns null if no acceptable result was found after 40 tries
    return null;
}



