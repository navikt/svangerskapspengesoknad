module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    rootDir: './',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
        'nav-(.*)-style': '<rootDir>/mockFile.js',
        '^app/(.*)': '<rootDir>/src/app/$1',
        '^uttaksplan/(.*)': '<rootDir>/src/uttaksplan/$1',
        '^common/(.*)': '<rootDir>/src/common/$1'
    }
};
