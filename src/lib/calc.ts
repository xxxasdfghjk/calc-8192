export const calcTable = (maxNumber: number) => {
    if (maxNumber < 0) {
        return [[]];
    }
    /**
     * initialize
     */
    const dp: number[][] = [];
    const initial = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dp.push(initial);
    if (maxNumber === 0) return dp;
    for (let j = 1; j <= maxNumber; j++) {
        const row = [];
        for (let i = 0; i <= 13; i++) {
            let res = 0;
            if (i === 0) {
                for (let k = 0; k <= 12; k++) {
                    res += dp[j - 1][k] / 2.0;
                }
            } else if (i === 13) {
                res += dp[j - 1][i] + dp[j - 1][i - 1] / 2.0;
            } else {
                res += dp[j - 1][i - 1] / 2.0;
            }
            row.push(res);
        }
        dp.push(row);
    }
    return dp;
};
const HALF = 0.5;
const MATRIX = [
    [HALF, HALF, HALF, HALF, HALF, HALF, HALF, HALF, HALF, HALF, HALF, HALF, HALF, 0],
    [HALF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, HALF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, HALF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, HALF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, HALF, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, HALF, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, HALF, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, HALF, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, HALF, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, HALF, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, HALF, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, HALF, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, HALF, 1],
];

const UNIT = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
];
const DIM = 14;

const matrixMulti = (mul1: number[][], mul2: number[][], dim: number): number[][] => {
    const res: number[][] = new Array(dim).fill(0).map(() => new Array(dim).fill(0));
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            for (let k = 0; k < dim; k++) {
                res[j][i] += mul1[j][k] * mul2[k][i];
            }
        }
    }
    return res;
};

const matrixPower = (mul: number[][], n: number, dim: number): number[][] => {
    if (n === 0) {
        return UNIT;
    } else if (n === 1) {
        return mul;
    } else {
        if (n % 2 === 1) {
            const half = matrixPower(mul, Math.floor(n / 2), dim);
            return matrixMulti(matrixMulti(half, half, dim), mul, dim);
        } else {
            const half = matrixPower(mul, n / 2, dim);
            return matrixMulti(half, half, dim);
        }
    }
};

export const nthProhability = (n: number) => {
    const res = matrixPower(MATRIX, n, DIM);
    return res.map((e) => e[0]);
};
