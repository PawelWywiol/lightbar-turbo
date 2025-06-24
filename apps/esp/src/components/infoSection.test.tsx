import { render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import { InfoSection } from './infoSection.js';

describe('InfoSection', () => {
  it('should render empty section', () => {
    const { container } = render(<InfoSection info={undefined} />);
    const section = container.querySelector('section');

    expect(section).toBeTruthy();
    expect(section?.childElementCount).toBe(0);
  });
});
