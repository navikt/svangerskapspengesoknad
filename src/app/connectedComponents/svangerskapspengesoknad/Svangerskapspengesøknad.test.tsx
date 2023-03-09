import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Svangerskapspengesoknad.stories';

const {
  VisApp,
} = composeStories(stories);

describe('<Svangerskapspengesøknad>', () => {
  it('skal rendre komponent ok', async () => {
    render(<VisApp />);

    expect(await screen.findByText('Jeg vil hjelpe deg med å fylle ut søknaden.')).toBeInTheDocument();
  });
});
