import * as React from 'react';
import renderer from 'react-test-renderer';

import Svangerskapspengesøknad from '../connected-components/Svangerskapspengesøknad';
describe('Svangerskapspengesøknad', () => {
    it('should be defined', () => {
        const component = renderer.create(<Svangerskapspengesøknad />);
        expect(component).toBeDefined();
    });
});
