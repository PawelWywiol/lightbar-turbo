import { render, screen } from '@testing-library/preact';
import type { ConnectionResponseData } from 'devices/connections.types';
import { describe, expect, it } from 'vitest';
import { InfoSection } from './infoSection';

describe('InfoSection', () => {
  it('should render empty section', () => {
    const { container } = render(<InfoSection />);
    const section = container.querySelector('section');

    expect(section).toBeTruthy();
    expect(section?.childElementCount).toBe(0);
  });

  it('should render section with info', () => {
    const info: ConnectionResponseData = {
      type: 'info',
      data: {
        uid: 'test',
        leds: 1,
        network: 0,
      },
    };

    render(<InfoSection info={info} />);

    expect(screen.getByText('uid :')).toBeInTheDocument();
    expect(screen.getByText('uid :').nextSibling?.textContent?.trim()).toBe('test');

    expect(screen.getByText('leds :')).toBeInTheDocument();
    expect(screen.getByText('leds :').nextSibling?.textContent?.trim()).toBe('1');
  });
});
