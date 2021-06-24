module.exports = {
    "roots": [
        "<rootDir>/test",
        "<rootDir>/src",
    ],
    "testMatch": [
        "**/*.spec.ts"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
}
