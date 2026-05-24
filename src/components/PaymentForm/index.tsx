import React, { useState, useEffect } from 'react';
import { MdSecurity, MdHelp } from 'react-icons/md';
import { BiWifi } from 'react-icons/bi';

import {
  FormWrapper,
  CardVisual,
  CardTop,
  CardMiddle,
  CardBottom,
  FormSection,
  FormGroup,
  FormRow,
  Label,
  Input,
  ErrorMsg,
  SecurityBadge,
  Disclaimer,
} from './styles';

interface PaymentFormProps {
  onValidChange: (isValid: boolean) => void;
  onNameChange: (name: string) => void;
}

const PaymentForm = ({ onValidChange, onNameChange }: PaymentFormProps): JSX.Element => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [touched, setTouched] = useState({
    cardNumber: false,
    cardName: false,
    expiry: false,
    cvv: false,
  });

  const digits = cardNumber.replace(/\D/g, '');

  const isCardNumberValid = digits.length === 16;

  const isCardNameValid = /^[a-zA-ZÀ-ÿ\s]{3,}$/.test(cardName.trim());

  const isExpiryValid = (() => {
    const parts = expiry.split('/');
    if (parts.length !== 2 || parts[0].length < 2 || parts[1].length < 2) return false;
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10) + 2000;
    if (month < 1 || month > 12) return false;
    const now = new Date();
    return new Date(year, month - 1) >= new Date(now.getFullYear(), now.getMonth());
  })();

  const isCvvValid = cvv.length === 3 && !/(.)\1/.test(cvv);

  const isValid = isCardNumberValid && isCardNameValid && isExpiryValid && isCvvValid;

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  useEffect(() => {
    onNameChange(cardName.trim());
  }, [cardName, onNameChange]);

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(raw);
  }

  function handleCardNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCardName(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').slice(0, 28));
  }

  function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiry(raw.length > 2 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw);
  }

  function handleCvvChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
  }

  function blur(field: keyof typeof touched) {
    setTouched(prev => ({ ...prev, [field]: true }));
  }

  const displayNumber = digits.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim();

  const displayExpiry = (() => {
    const parts = expiry.split('/');
    const mm = (parts[0] || '').padEnd(2, '•');
    const yy = (parts[1] || '').padEnd(2, '•');
    return `${mm}/${yy}`;
  })();

  const formattedInput = digits.replace(/(.{4})/g, '$1 ').trim();

  return (
    <FormWrapper>
      <CardVisual>
        <CardTop>
          <span className="visa">VISA</span>
          <BiWifi size={28} style={{ transform: 'rotate(90deg)' }} />
        </CardTop>
        <CardMiddle>
          <span className="card-number">{displayNumber}</span>
        </CardMiddle>
        <CardBottom>
          <span className={!cardName.trim() ? 'placeholder' : ''}>
            {cardName.trim() || 'Seu nome aqui'}
          </span>
          <span>{displayExpiry}</span>
        </CardBottom>
      </CardVisual>

      <FormSection>
        <FormGroup>
          <Label>Número do cartão</Label>
          <Input
            type="text"
            placeholder="0000 0000 0000 0000"
            value={formattedInput}
            onChange={handleCardNumberChange}
            onBlur={() => blur('cardNumber')}
            $hasError={touched.cardNumber && !isCardNumberValid}
            $isValid={touched.cardNumber && isCardNumberValid}
            maxLength={19}
          />
          {touched.cardNumber && !isCardNumberValid && (
            <ErrorMsg>Informe os 16 dígitos do cartão</ErrorMsg>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Nome do titular</Label>
          <Input
            type="text"
            placeholder="Nome como está no cartão"
            value={cardName}
            onChange={handleCardNameChange}
            onBlur={() => blur('cardName')}
            $hasError={touched.cardName && !isCardNameValid}
            $isValid={touched.cardName && isCardNameValid}
            maxLength={28}
          />
          {touched.cardName && !isCardNameValid && (
            <ErrorMsg>Mínimo 3 letras, sem números ou caracteres especiais</ErrorMsg>
          )}
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label>Validade</Label>
            <Input
              type="text"
              placeholder="mm/aa"
              value={expiry}
              onChange={handleExpiryChange}
              onBlur={() => blur('expiry')}
              $hasError={touched.expiry && !isExpiryValid}
              $isValid={touched.expiry && isExpiryValid}
              maxLength={5}
            />
            {touched.expiry && !isExpiryValid && (
              <ErrorMsg>Data inválida ou expirada</ErrorMsg>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              CVV{' '}
              <MdHelp size={14} title="3 dígitos no verso do cartão" style={{ verticalAlign: 'middle', color: '#8D8D99' }} />
            </Label>
            <Input
              type="text"
              placeholder="***"
              value={cvv}
              onChange={handleCvvChange}
              onBlur={() => blur('cvv')}
              $hasError={touched.cvv && !isCvvValid}
              $isValid={touched.cvv && isCvvValid}
              maxLength={3}
            />
            {touched.cvv && !isCvvValid && (
              <ErrorMsg>CVV inválido</ErrorMsg>
            )}
          </FormGroup>
        </FormRow>

        <SecurityBadge>
          <MdSecurity size={20} color="#00B37E" />
          <span>Seus dados estão seguros</span>
        </SecurityBadge>

        <Disclaimer>
          Os dados inseridos são fictícios e servem apenas para teste do formulário
          e para dar continuidade ao fluxo do projeto.
        </Disclaimer>
      </FormSection>
    </FormWrapper>
  );
};

export default PaymentForm;
