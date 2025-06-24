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
      message: 'Test message',
      data: {
        uid: 'test',
        leds: 1,
        free: 2048,
        used: 1024,
        total: 3072,
        network: 0,
        host: 'test.local',
      },
    };

    render(<InfoSection info={info} />);

    expect(screen.getByText('uid :')).toBeInTheDocument();
    expect(screen.getByText('uid :').nextSibling?.textContent?.trim()).toBe('test');

    expect(screen.getByText('leds :')).toBeInTheDocument();
    expect(screen.getByText('leds :').nextSibling?.textContent?.trim()).toBe('1');

    expect(screen.getByText('space :')).toBeInTheDocument();
    expect(screen.getByText('space :').nextSibling?.textContent?.trim()).toBe('2.00 KB / 3.00 KB');

    expect(screen.getByText('host :')).toBeInTheDocument();
    expect(screen.getByText('host :').nextSibling?.textContent?.trim()).toBe('test.local');
  });
});
