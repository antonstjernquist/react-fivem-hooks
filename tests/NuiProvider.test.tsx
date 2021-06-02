import React from 'react';
import { render, screen } from '@testing-library/react';
import { NuiProvider } from '../src/provider/NuiProvider';

describe('NuiProvider', () => {
  test('should render children in provider', () => {
    render(
      <NuiProvider>
        <span>hi</span>
      </NuiProvider>
    );

    expect(screen.getByText('hi')).toBeInTheDocument();
  });
});
