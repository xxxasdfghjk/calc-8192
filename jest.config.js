module.exports = {
    transform: {
        "^.+\\.ts$": "babel-jest",
    },
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    moduleFileExtensions: ["ts", "js"],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
};
