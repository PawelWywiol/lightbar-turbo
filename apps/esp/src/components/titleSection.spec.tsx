import { render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import { TitleSection } from './titleSection';

describe('TitleSection', () => {
  it('should render section with info', () => {
    render(<TitleSection />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Lightbar');
  });

  it('should render section without message', () => {
    render(<TitleSection />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Lightbar');
  });
});
