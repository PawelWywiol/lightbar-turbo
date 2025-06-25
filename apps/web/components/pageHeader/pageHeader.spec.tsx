import { render, screen } from '@testing-library/react';
import { ConnectedDevicesProvider } from 'devices/devices.provider';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './pageHeader';

describe('PageHeader', () => {
  it('should render section with info', () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <ConnectedDevicesProvider>
            <PageHeader />
          </ConnectedDevicesProvider>
        ),
      },
    ]);

    render(<Stub initialEntries={['/']} />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Lightbar');
  });
});
