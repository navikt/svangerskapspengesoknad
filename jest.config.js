module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    coverageReporters: ['text-summary'],
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'less', 'css'],
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
        '^app/(.*)': '<rootDir>/src/app/$1',
        '^uttaksplan/(.*)': '<rootDir>/src/uttaksplan/$1',
        '^common/(.*)': '<rootDir>/src/common/$1',
    },
    rootDir: './',
    roots: ['<rootDir>/src/app/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.(ts|tsx|js)?$': 'babel-jest',
    },
    transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*nav.*).*$'],
};
