import { render, screen } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';

vi.mock('devices/devices.hooks', () => ({
  useConnectedDeviceData: vi.fn(),
}));

const useConnectedDeviceData = vi.spyOn(
  await import('devices/devices.hooks'),
  'useConnectedDeviceData',
);

describe('App', () => {
  it('should render empty app with the app name', () => {
    useConnectedDeviceData.mockReturnValue({
      status: 'CLOSED',
      updateStatus: vi.fn(),
      info: {
        type: 'info',
        message: 'Connected to device',
        data: {
          uid: 'test',
          leds: 1,
          free: 2048,
          used: 1024,
          total: 3072,
          network: 0,
          host: 'test.local',
        },
      },
      send: vi.fn(),
    });

    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Lightbar');
  });

  it('should render info section with device info', () => {
    useConnectedDeviceData.mockReturnValue({
      status: 'CONNECTED',
      updateStatus: vi.fn(),
      info: {
        type: 'info',
        message: 'Connected to device',
        data: {
          uid: 'test',
          leds: 1,
          free: 2048,
          used: 1024,
          total: 3072,
          network: 1,
          host: 'test.local',
        },
      },
      send: vi.fn(),
    });

    render(<App />);

    expect(screen.queryByRole('textbox', { name: 'ssid' })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('password')).not.toBeInTheDocument();
  });

  it('should render wifi credentials section when connected to AP network', async () => {
    useConnectedDeviceData.mockReturnValue({
      status: 'CONNECTED',
      updateStatus: vi.fn(),
      info: {
        type: 'info',
        message: 'Connected to device',
        data: {
          uid: 'test',
          leds: 1,
          free: 2048,
          used: 1024,
          total: 3072,
          network: 2,
          host: 'test.local',
        },
      },
      send: vi.fn(),
    });

    render(<App />);

    expect(screen.getByRole('textbox', { name: 'ssid' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });
});
