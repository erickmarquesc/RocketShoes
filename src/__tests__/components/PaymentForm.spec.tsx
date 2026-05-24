import { render, fireEvent } from '@testing-library/react';
import PaymentForm from '../../components/PaymentForm';

describe('PaymentForm Component', () => {
  let onValidChange: ReturnType<typeof vi.fn>;
  let onNameChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onValidChange = vi.fn();
    onNameChange = vi.fn();
  });

  const renderForm = () =>
    render(
      <PaymentForm onValidChange={onValidChange} onNameChange={onNameChange} />
    );

  // ─── validity state ──────────────────────────────────────────────────────

  it('should start as invalid', () => {
    renderForm();
    expect(onValidChange).toHaveBeenLastCalledWith(false);
  });

  it('should call onValidChange(true) when all fields are correctly filled', () => {
    const { getByPlaceholderText } = renderForm();

    fireEvent.change(getByPlaceholderText('0000 0000 0000 0000'), {
      target: { value: '1234567890123456' },
    });
    fireEvent.change(getByPlaceholderText('Nome como está no cartão'), {
      target: { value: 'João Silva' },
    });
    fireEvent.change(getByPlaceholderText('mm/aa'), {
      target: { value: '1230' },
    });
    fireEvent.change(getByPlaceholderText('***'), {
      target: { value: '123' },
    });

    expect(onValidChange).toHaveBeenLastCalledWith(true);
  });

  it('should be invalid when card number has less than 16 digits', () => {
    const { getByPlaceholderText } = renderForm();

    fireEvent.change(getByPlaceholderText('0000 0000 0000 0000'), {
      target: { value: '123456789' },
    });

    expect(onValidChange).toHaveBeenLastCalledWith(false);
  });

  it('should be invalid when expiry date is in the past', () => {
    const { getByPlaceholderText } = renderForm();

    fireEvent.change(getByPlaceholderText('mm/aa'), {
      target: { value: '0124' },
    });

    expect(onValidChange).toHaveBeenLastCalledWith(false);
  });

  it('should be invalid when CVV has consecutively repeated digits', () => {
    const { getByPlaceholderText } = renderForm();

    fireEvent.change(getByPlaceholderText('***'), {
      target: { value: '112' },
    });

    expect(onValidChange).toHaveBeenLastCalledWith(false);
  });

  // ─── card name ───────────────────────────────────────────────────────────

  it('should call onNameChange when name field changes', () => {
    const { getByPlaceholderText } = renderForm();

    fireEvent.change(getByPlaceholderText('Nome como está no cartão'), {
      target: { value: 'Maria' },
    });

    expect(onNameChange).toHaveBeenCalledWith('Maria');
  });

  it('should strip numbers and special characters from the name field', () => {
    const { getByPlaceholderText } = renderForm();

    fireEvent.change(getByPlaceholderText('Nome como está no cartão'), {
      target: { value: 'Ana123@#!' },
    });

    expect(onNameChange).toHaveBeenCalledWith('Ana');
  });

  it('should limit card name to 28 characters', () => {
    const { getByPlaceholderText } = renderForm();

    fireEvent.change(getByPlaceholderText('Nome como está no cartão'), {
      target: { value: 'A'.repeat(30) },
    });

    expect(onNameChange).toHaveBeenCalledWith('A'.repeat(28));
  });

  // ─── touched / error messages ────────────────────────────────────────────

  it('should not show card number error before blur', () => {
    const { getByPlaceholderText, queryByText } = renderForm();

    fireEvent.change(getByPlaceholderText('0000 0000 0000 0000'), {
      target: { value: '1234' },
    });

    expect(
      queryByText('Informe os 16 dígitos do cartão')
    ).not.toBeInTheDocument();
  });

  it('should show card number error after blur when invalid', () => {
    const { getByPlaceholderText, getByText } = renderForm();
    const input = getByPlaceholderText('0000 0000 0000 0000');

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.blur(input);

    expect(getByText('Informe os 16 dígitos do cartão')).toBeInTheDocument();
  });

  it('should show name error after blur when name is too short', () => {
    const { getByPlaceholderText, getByText } = renderForm();
    const input = getByPlaceholderText('Nome como está no cartão');

    fireEvent.change(input, { target: { value: 'Jo' } });
    fireEvent.blur(input);

    expect(
      getByText('Mínimo 3 letras, sem números ou caracteres especiais')
    ).toBeInTheDocument();
  });

  it('should show expiry error after blur when date is expired', () => {
    const { getByPlaceholderText, getByText } = renderForm();
    const input = getByPlaceholderText('mm/aa');

    fireEvent.change(input, { target: { value: '0124' } });
    fireEvent.blur(input);

    expect(getByText('Data inválida ou expirada')).toBeInTheDocument();
  });

  it('should show CVV error after blur when digits repeat consecutively', () => {
    const { getByPlaceholderText, getByText } = renderForm();
    const input = getByPlaceholderText('***');

    fireEvent.change(input, { target: { value: '112' } });
    fireEvent.blur(input);

    expect(getByText('CVV inválido')).toBeInTheDocument();
  });

  it('should not show CVV error for a valid non-repeating CVV', () => {
    const { getByPlaceholderText, queryByText } = renderForm();
    const input = getByPlaceholderText('***');

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.blur(input);

    expect(queryByText('CVV inválido')).not.toBeInTheDocument();
  });
});
