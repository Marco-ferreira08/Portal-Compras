# Portal de Compras

Portal de e-commerce completo, construído em React, para consulta e simulação de compras de produtos através da Fake Store API. Projeto final de curso, com foco nos fundamentos de React: hooks, Context API, roteamento, consumo de API, persistência local e boas práticas de acessibilidade e responsividade.

## Visão geral

- Catálogo de produtos com busca e filtro por categoria
- Página de detalhes de cada produto
- Carrinho de compras persistente, com cálculo automático de subtotal e total
- Tema claro/escuro
- Layout 100% responsivo (desktop, tablet e celular)

## Funcionalidades

### Catálogo
- Listagem de produtos vindos da Fake Store API
- Filtro por categoria, carregado dinamicamente pela API
- Busca por título, com debounce, combinável com o filtro de categoria
- Estados de carregamento (skeleton), erro (com botão "Tentar novamente") e vazio

### Detalhes do produto
- Rota dinâmica `/produto/:id`
- Imagem, título, descrição, categoria, avaliação e preço
- Seletor de quantidade
- Tratamento de produto inexistente e de erro de API

### Carrinho de compras
- Adicionar, remover, aumentar e diminuir quantidade de itens
- Produtos repetidos não duplicam linha — a quantidade é somada automaticamente
- Cálculo de subtotal por item e total geral (via `useMemo`)
- Persistência via `localStorage`, com recuperação segura de dados corrompidos ou inexistentes
- Contador de itens no cabeçalho, atualizado em tempo real
- Estado vazio com chamada para continuar comprando

### Extras
- **Busca com debounce** (350ms), evitando refiltragem a cada tecla digitada
- **Tema claro/escuro**, com persistência da preferência e leitura da preferência do sistema operacional na primeira visita

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| React + Vite | Base da aplicação |
| TypeScript | Tipagem estática |
| React Router | Roteamento entre páginas |
| Context API + useReducer | Estado global do carrinho e do tema |
| Fetch API | Consumo da Fake Store API |
| Tailwind CSS v4 | Estilização |
| localStorage | Persistência do carrinho e da preferência de tema |

Nenhuma biblioteca de UI, gerenciamento de estado externo (Redux/Zustand) ou requisição HTTP externa (Axios) foi utilizada — optou-se por recursos nativos do React e do navegador sempre que possível.

## Estrutura do projeto
src/
├── components/
│ ├── Header/
│ ├── Footer/
│ ├── Layout/
│ ├── ProductCard/
│ ├── ProductGrid/
│ ├── CategoryFilter/
│ ├── SearchBar/
│ ├── CartItem/
│ ├── CartSummary/
│ ├── Loading/
│ ├── ErrorMessage/
│ ├── EmptyState/
│ └── icons/
├── pages/
│ ├── Home/
│ ├── ProductDetails/
│ ├── Cart/
│ └── NotFound/
├── hooks/
│ ├── useProducts.ts
│ ├── useProduct.ts
│ ├── useCategories.ts
│ ├── useCart.ts
│ ├── useTheme.ts
│ └── useDebounce.ts
├── context/
│ ├── CartContext.tsx
│ └── ThemeContext.tsx
├── services/
│ └── api.ts
├── types/
│ ├── product.ts
│ └── cart.ts
├── utils/
│ ├── formatCurrency.ts
│ ├── text.ts
│ ├── storage.ts
│ └── constants.ts
├── App.tsx
├── router.tsx
└── main.tsx


Cada camada tem uma responsabilidade única: componentes cuidam só de apresentação, hooks concentram o acesso a dados, o contexto guarda o estado global, e `services/api.ts` é o único lugar que conversa com a Fake Store API.

## Como executar

```bash
npm install
npm run dev
```

A aplicação abre por padrão em `http://localhost:5173`.

## Como gerar build

```bash
npm run build
```

Os arquivos de produção são gerados na pasta `dist/`.

## API utilizada

Todos os dados de produtos e categorias vêm da [Fake Store API](https://fakestoreapi.com/docs), uma API pública e gratuita para testes de e-commerce. Não é necessária autenticação.

Endpoints consumidos:
- `GET /products` — lista todos os produtos
- `GET /products/:id` — detalhes de um produto
- `GET /products/categories` — lista de categorias
- `GET /products/category/:category` — produtos de uma categoria

## Funcionalidades extras implementadas

- **Busca com debounce**: filtro por título do produto, aguardando o usuário parar de digitar antes de filtrar, evitando processamento desnecessário a cada tecla
- **Dark mode**: alternância manual de tema, com persistência em `localStorage` e leitura da preferência do sistema operacional na primeira visita

## Aprendizados

Este projeto foi utilizado para praticar:
- Consumo de APIs REST com `fetch`, incluindo tratamento de loading, erro e dados ausentes
- Hooks customizados (`useProducts`, `useProduct`, `useCategories`, `useCart`, `useTheme`, `useDebounce`) para isolar lógica reutilizável
- Gerenciamento de estado global com Context API + `useReducer`, evitando prop drilling
- Persistência de dados no navegador com `localStorage`, incluindo tratamento de dados corrompidos
- Roteamento client-side com React Router (rotas dinâmicas, rota 404)
- `useMemo` e `useCallback` para evitar cálculos e re-renderizações desnecessárias
- Boas práticas de acessibilidade (HTML semântico, `alt`, `aria-label`, foco visível, navegação por teclado)
- Estilização com Tailwind CSS (utilitários, tema customizado, dark mode via variante de classe)

## Possíveis melhorias futuras

- Autenticação de usuários
- Backend próprio com banco de dados
- Checkout real com integração de pagamento
- Lista de produtos favoritos
- Histórico de pedidos
- Testes automatizados (unitários e de integração)

---

Projeto acadêmico desenvolvido com fins de aprendizado, utilizando dados da [Fake Store API](https://fakestoreapi.com).

---
