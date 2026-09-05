import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";
import { capitalizeFirst } from "../../utils/text";
import { Loading } from "../../components/Loading/Loading";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import {
  ArrowLeftIcon,
  CartIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  BoxIcon,
} from "../../components/icons/Icons";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : undefined;
  const { product, loading, error, notFound, refetch } = useProduct(numericId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, quantity);
  }

  if (loading) {
    return <Loading message="Carregando produto..." />;
  }

  if (notFound) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
        <BoxIcon className="h-9 w-9 text-stone-400" />
        <p className="text-stone-600 dark:text-stone-400">Produto não encontrado.</p>
        <Link
          to="/"
          className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          Voltar aos produtos
        </Link>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!product) {
    return null;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-stone-600 hover:text-brand-700 dark:text-stone-400 dark:hover:text-brand-400"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Voltar aos produtos
      </Link>

      <div className="grid gap-10 sm:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg border border-stone-200 bg-stone-100 p-10 dark:border-stone-800 dark:bg-stone-900">
          <img src={product.image} alt={product.title} className="max-h-80 max-w-full object-contain" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {capitalizeFirst(product.category)}
          </span>

          <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-50">
            {product.title}
          </h1>

          {product.rating && (
            <div className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
              <StarIcon className="h-4 w-4 text-gold-500" />
              <span>{product.rating.rate}</span>
              <span>({product.rating.count} avaliações)</span>
            </div>
          )}

          <p className="font-display text-3xl font-bold text-stone-900 dark:text-stone-50">
            {formatCurrency(product.price)}
          </p>

          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {product.description}
          </p>

          <div className="mt-2 flex flex-col gap-2">
            <span id="quantity-label" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Quantidade
            </span>
            <div
              role="group"
              aria-labelledby="quantity-label"
              className="flex w-fit items-center gap-3 rounded-md border border-stone-300 dark:border-stone-700"
            >
              <button
                type="button"
                onClick={handleDecrease}
                aria-label="Diminuir quantidade"
                className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-stone-400 dark:hover:text-stone-100"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="min-w-6 text-center text-sm font-semibold text-stone-900 dark:text-stone-50">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Aumentar quantidade"
                className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-stone-400 dark:hover:text-stone-100"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-3 flex items-center justify-center gap-2 rounded-md bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            <CartIcon className="h-4 w-4" />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </main>
  );
}