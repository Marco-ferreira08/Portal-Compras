import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";
import { capitalizeFirst } from "../../utils/text";
import { useCart } from "../../hooks/useCart";
import { CartIcon, StarIcon } from "../icons/Icons";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-brand-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-brand-600">
      <Link
        to={`/produto/${product.id}`}
        className="block overflow-hidden bg-stone-100 dark:bg-stone-800"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-44 w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {capitalizeFirst(product.category)}
        </span>

        <Link
          to={`/produto/${product.id}`}
          className="line-clamp-2 text-sm font-medium text-stone-900 hover:text-brand-700 dark:text-stone-100 dark:hover:text-brand-400"
        >
          {product.title}
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
            <StarIcon className="h-3.5 w-3.5 text-gold-500" />
            <span>{product.rating.rate}</span>
            <span>({product.rating.count})</span>
          </div>
        )}

        <p className="mt-1 font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
          {formatCurrency(product.price)}
        </p>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-auto flex items-center justify-center gap-2 rounded-md bg-brand-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <CartIcon className="h-4 w-4" />
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}