import { render, screen } from '@testing-library/preact';
import { userEvent } from '@testing-library/user-event';
import type { ConnectionRequestData } from 'devices/connections.types';
import { describe, expect, it, vi } from 'vitest';
import { WifiSection } from './wifiSection';

describe('WifiSection', () => {
  it('should render wifi creditionals form', () => {
    const mockSend = vi.fn(async (_: ConnectionRequestData[]) => {});

    render(<WifiSection send={mockSend} />);

    expect(screen.getByRole('textbox', { name: 'ssid' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('should call send with wifi credentials', async () => {
    const mockSend = vi.fn(async (_: ConnectionRequestData[]) => {});

    render(<WifiSection send={mockSend} />);

    const ssidInput = screen.getByRole('textbox', { name: 'ssid' });
    const passwordInput = screen.getByPlaceholderText('password');
    const saveButton = screen.getByRole('button', { name: 'Save' });

    const user = userEvent.setup();

    await user.type(ssidInput, 'test ssid');
    await user.type(passwordInput, 'test password');
    await user.click(saveButton);

    expect(mockSend).toHaveBeenCalledWith([
      {
        data: {
          password: 'test password',
          ssid: 'test ssid',
        },
        type: 'wifi',
      },
    ]);
  });
});
