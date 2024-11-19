import { render, fireEvent, screen } from '@testing-library/react';
import { Button, BUTTON_VARIANTS } from './Button';

describe('Button Component', () => {
  const defaultProps = {
    onClick: jest.fn()
  };

  it('renders correctly with default props', () => {
    render(<Button {...defaultProps}>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    render(<Button {...defaultProps}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant class', () => {
    render(
      <Button 
        {...defaultProps} 
        variant={BUTTON_VARIANTS.PRIMARY}
      >
        Primary Button
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass(styles.primary);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Button {...defaultProps} disabled>
        Disabled Button
      </Button>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with icon', () => {
    const icon = <span data-testid="test-icon">🔥</span>;
    render(
      <Button {...defaultProps} icon={icon}>
        Icon Button
      </Button>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('uses default text from BUTTON_TEXTS when no children provided', () => {
    render(
      <Button 
        {...defaultProps} 
        variant={BUTTON_VARIANTS.CONTINUE} 
      />
    );
    expect(screen.getByText('Продовжити')).toBeInTheDocument();
  });
});