# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    # Amazon Project (Vite + React + TypeScript)

    This repository is a demo / small storefront implemented with React, TypeScript, and Vite. It includes a simple JSON API (via json-server) used for products and cart data, and component-level state for shopping cart interactions.

    This README covers how to run and develop the project locally, explains the important scripts, and documents a few structural decisions made in the codebase.

    ## Quick start

    Prerequisites:
    - Node.js 18+ (recommended)

    Install dependencies:

    ```powershell
    npm install
    ```

    Start the local JSON API server (dev data):

    ```powershell
    npm run server
    ```

    Start the dev server (Vite):

    ```powershell
    npm run dev
    ```

    Open http://localhost:5173 (Vite's default) in your browser. The json-server API runs on port 3001 by default (`db.json`).

    ## Important npm scripts

    - `npm run dev` - start Vite dev server with HMR
    - `npm run build` - type-check (tsc -b) and build production assets with Vite
    - `npm run preview` - preview built `dist/` locally
    - `npm run lint` - run ESLint across the codebase
    - `npm run server` - start `json-server --watch db.json --port 3001` (the local API)

    ## Project structure (selected)

    - `src/` - React app source
      - `components/` - React components used by pages (Order, OrderSummary, ProductsGrid, etc.)
      - `pages/` - top-level pages (Checkout, Orders, Tracking)
      - `scripts/data/` - small data hooks and domain classes (products, cart, deliveryOptions)
      - `main.tsx`, `App.tsx` - bootstrapping
    - `db.json` - json-server database for products and cart data

    ## Notable implementation details

    - Hooks & context
      - There is a `HooksContextProvider` that composes product and cart hooks and provides them to the app.
      - `useData()` is the convenience hook to consume the provider; it lives in `src/components/useData.ts` to keep the provider file exporting only components (this avoids Fast Refresh warnings during development).

    - Cart API helpers
      - The cart hook (`src/scripts/data/cart.ts`) exposes updater helpers: `fetchCart`, `updateCartItem`, `removeCartItem`, and `addCartItem`. These functions patch/post to the API and update the local cart state immutably.

    - Order items and hooks
      - Per-item UI state (editing quantity, selected delivery option) lives inside the `Order` component so React hooks are always called at top-level of a component (avoids calling hooks inside map callbacks).

    - Empty cart UX
      - When the cart is empty, a responsive `EmptyCart` component is displayed with a link back to the home/products page.

    ## Local development tips

    - If you change data types, run `npm run build` to catch TypeScript errors quickly (this project uses `tsc -b`).
    - ESLint is configured; run `npm run lint` and fix warnings/complaints as you develop. The repo uses the `react-refresh/only-export-components` rule — keep hook utilities and helpers in separate files from components to avoid Fast Refresh warnings.

    ## Troubleshooting

    - Dev server not picking up API changes: make sure `npm run server` (json-server) is running on port `3001`.
    - Fast Refresh warning `only export components`: move helper functions or hooks into separate files (e.g., `src/components/useData.ts`) so component files export only components.

    ## Next steps / suggestions

    - Add unit tests for the cart updater functions and key components (Jest + React Testing Library).
    - Replace confirm/alert flows with accessible modal components for better UX.
    - Consider centralizing API base URL into an environment variable.

    ---
