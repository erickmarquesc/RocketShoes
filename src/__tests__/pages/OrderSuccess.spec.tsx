import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderSuccess from '../../pages/OrderSuccess';

const mockPush = vi.fn();
const mockReplace = vi.fn();

interface LocationState {
  cardName: string;
  orderId: string;
  loyaltyCount: number;
  discountActivated: boolean;
  moletomDiscountActivated: boolean;
}

let mockState: LocationState | null = null;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => ({ push: mockPush, replace: mockReplace }),
    useLocation: () => ({ state: mockState }),
  };
});

const defaultState: LocationState = {
  cardName: 'João Silva',
  orderId: 'ORD-TEST-1234',
  loyaltyCount: 7,
  discountActivated: false,
  moletomDiscountActivated: false,
};

const renderSuccess = () =>
  render(
    <MemoryRouter>
      <OrderSuccess />
    </MemoryRouter>
  );

describe('OrderSuccess Page', () => {
  beforeEach(() => {
    mockState = defaultState;
  });

  // ─── guard ───────────────────────────────────────────────────────────────

  it('should redirect to home when accessed without order state', () => {
    mockState = null;
    renderSuccess();
    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  // ─── success card ────────────────────────────────────────────────────────

  it('should render the cardholder name in the greeting', () => {
    renderSuccess();
    expect(screen.getByText(/João Silva/)).toBeInTheDocument();
  });

  it('should render the order ID in the success card', () => {
    renderSuccess();
    // The order ID appears in both the success card (<strong>) and the
    // loyalty card header (<span>); assert at least one is present.
    const matches = screen.getAllByText('ORD-TEST-1234');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ─── loyalty card ────────────────────────────────────────────────────────

  it('should show the correct remaining purchases count', () => {
    // loyaltyCount = 7 → remaining = 3
    renderSuccess();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/compras restantes/)).toBeInTheDocument();
  });

  it('should show singular text when only 1 purchase remains', () => {
    mockState = { ...defaultState, loyaltyCount: 9, discountActivated: false, moletomDiscountActivated: false };
    renderSuccess();
    expect(screen.getByText('1')).toBeInTheDocument();
    // getNodeText trims whitespace, so match without the leading space
    expect(screen.getByText(/compra restante/)).toBeInTheDocument();
    expect(screen.queryByText(/compras restantes/)).not.toBeInTheDocument();
  });

  it('should display the progress label with correct count', () => {
    renderSuccess();
    expect(screen.getByText('7 de 10')).toBeInTheDocument();
  });

  it('should show "cartão completo" message when all 10 slots are filled', () => {
    mockState = { ...defaultState, loyaltyCount: 10, discountActivated: true, moletomDiscountActivated: false };
    renderSuccess();
    expect(screen.getByText(/cartão completo/i)).toBeInTheDocument();
    expect(screen.getByText('10 de 10')).toBeInTheDocument();
  });

  // ─── discount banner ─────────────────────────────────────────────────────

  it('should show the discount activated banner when discount was just unlocked', () => {
    mockState = { ...defaultState, loyaltyCount: 10, discountActivated: true, moletomDiscountActivated: false };
    renderSuccess();
    expect(
      screen.getByText(/Você ganhou 10% de desconto/i)
    ).toBeInTheDocument();
  });

  it('should not show the discount banner when discount was not activated', () => {
    renderSuccess();
    expect(
      screen.queryByText(/Você ganhou 10% de desconto/i)
    ).not.toBeInTheDocument();
  });

  // ─── moletom discount banner ──────────────────────────────────────────────

  it('should show the moletom discount banner when moletomDiscountActivated is true', () => {
    mockState = { ...defaultState, loyaltyCount: 2, moletomDiscountActivated: true };
    renderSuccess();
    expect(
      screen.getByText(/Você ganhou 5% de desconto/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Válido para todos os produtos de moletom/i)
    ).toBeInTheDocument();
  });

  it('should not show the moletom discount banner when moletomDiscountActivated is false', () => {
    renderSuccess();
    expect(
      screen.queryByText(/Você ganhou 5% de desconto/i)
    ).not.toBeInTheDocument();
  });

  // ─── navigation ──────────────────────────────────────────────────────────

  it('should navigate to home when clicking the continue button', () => {
    renderSuccess();
    fireEvent.click(screen.getByRole('button', { name: /Continuar comprando/i }));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
