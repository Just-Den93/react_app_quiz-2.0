// MenuModal.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import MenuModal from './MenuModal';

describe('MenuModal', () => {
  const mockProps = {
    showSettings: jest.fn(),
    showMainMenu: jest.fn(),
    onNewGame: jest.fn()
  };

  it('renders correctly when visible', () => {
    render(<MenuModal {...mockProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on escape key', () => {
    render(<MenuModal {...mockProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});