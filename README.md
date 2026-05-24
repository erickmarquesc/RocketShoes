# RocketShoes

E-commerce de calçados e roupas com carrinho de compras, sistema de fidelidade e descontos progressivos. SPA construída com React 18 + TypeScript + Vite.

---

## Funcionalidades

- Catálogo de produtos com modal de detalhes, seleção de tamanho e adição ao carrinho
- Carrinho com controle de quantidade, remoção e validação de estoque em tempo real
- Formulário de pagamento com validação de cartão de crédito
- Sistema de fidelidade: cartão com 10 slots que acumula compras
  - 2ª compra: **5% de desconto** em produtos de moletom
  - 10ª compra: **10% de desconto** em todos os produtos
- Descontos aplicados no preço no momento da adição ao carrinho
- Página de confirmação de pedido com confetti animado e card de progresso
- Persistência do carrinho e contagem de fidelidade via `localStorage`
- Layout responsivo mobile-first

---

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite 6 |
| Estilização | styled-components v6 |
| Roteamento | React Router DOM v5 |
| HTTP | Axios |
| Mock API | JSON Server |
| Testes | Vitest + Testing Library |

---

## Arquitetura

### Padrão Compound Components

Os três componentes principais seguem o padrão *Compound Components* com contexto próprio. Cada sub-componente vive em arquivo separado e o `index.tsx` agrega via `Object.assign`:

```
components/
├── CartItem/
│   ├── context.tsx       # CartItemContext + useCartItem
│   ├── Root.tsx          # Provider + CartItemRow (styled)
│   ├── Image.tsx
│   ├── Info.tsx
│   ├── QtyControls.tsx
│   ├── Subtotal.tsx
│   ├── RemoveButton.tsx
│   ├── styles.ts
│   └── index.tsx         # Object.assign(Root, { Image, Info, ... })
│
├── LoyaltyCard/
│   ├── context.tsx
│   ├── Root.tsx
│   ├── Header.tsx
│   ├── Slots.tsx
│   ├── Progress.tsx
│   ├── RewardBanner.tsx
│   ├── styles.ts
│   └── index.tsx
│
└── ProductModal/
    ├── context.tsx
    ├── Root.tsx          # rota filhos por displayName (Image vs conteúdo)
    ├── Image.tsx         # displayName = 'ProductModal.Image'
    ├── Header.tsx
    ├── DiscountBanner.tsx
    ├── PriceSection.tsx
    ├── SizeSelector.tsx
    ├── CartButton.tsx
    ├── styles.ts
    └── index.tsx
```

Uso no consumidor:

```tsx
<CartItem product={product} stockAmount={stock} onIncrement={...} onDecrement={...} onRemove={...}>
  <CartItem.Image />
  <CartItem.Info />
  <CartItem.QtyControls />
  <CartItem.Subtotal />
  <CartItem.RemoveButton />
</CartItem>
```

### Hooks customizados

| Hook | Responsabilidade |
|---|---|
| `useCart` | Estado global do carrinho via Context API, sincronização com `localStorage`, validação de estoque, aplicação de descontos no `addProduct` |
| `useOrderCompletion` | Lógica de finalização do pedido: consumo de desconto ativo, incremento do contador de fidelidade, ativação de novos descontos por milestone, navegação para `/success` |

### Lógica de descontos

Os descontos são armazenados em `localStorage` e lidos no momento da adição do produto ao carrinho:

```
@RocketShoes:loyaltyCount      → número da compra atual (0–9)
@RocketShoes:hasDiscount       → 'true' quando 10% ativo
@RocketShoes:hasDiscountMoletom → 'true' quando 5% moletom ativo
```

Ao finalizar um pedido (`useOrderCompletion`):
1. Desconto ativo é consumido (removido)
2. Contador é incrementado
3. Se `count === 2` → ativa desconto moletom
4. Se `count >= 10` → ativa desconto geral e reseta contador para 0

---

## Como executar

### Requisitos

- Node.js ≥ 18
- Yarn

### Instalação

```bash
git clone <repo-url>
cd RocketShoes
yarn install
```

### Desenvolvimento

Inicie o servidor da API e o Vite em terminais separados:

```bash
yarn server   # JSON Server em http://localhost:3333
yarn start    # Vite dev server em http://localhost:5173
```

### Build de produção

```bash
yarn build
yarn preview
```

---

## Testes

```bash
yarn test          # executa todos os testes uma vez
yarn test:watch    # modo watch
```

Cobertura atual: **58 testes** distribuídos em:

```
src/__tests__/
├── components/
│   ├── Header.spec.tsx
│   └── PaymentForm.spec.tsx
├── hooks/
│   └── useCart.spec.tsx
└── pages/
    ├── Cart.spec.tsx
    ├── Home.spec.tsx
    └── OrderSuccess.spec.tsx
```

---

## Estrutura de pastas

```
src/
├── __tests__/          # testes por camada
├── components/         # componentes reutilizáveis (compound components)
├── hooks/              # useCart, useOrderCompletion
├── pages/              # Home, Cart, OrderSuccess
├── services/           # instância Axios
├── styles/             # estilos globais
├── types.ts            # interfaces compartilhadas (Product, Stock)
└── util/               # formatPrice
```

---

## Variáveis de ambiente e portas

| Serviço | Porta padrão |
|---|---|
| Vite (frontend) | `5173` |
| JSON Server (API) | `3333` |

A URL base da API é configurada em `src/services/api.ts`.
