import type { CartItem as CartItemType } from "../../types/cart";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCart } from "../../hooks/useCart";
import { MinusIcon, PlusIcon, TrashIcon } from "../icons/Icons";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
      <img
        src={item.image}
        alt={item.title}
        className="h-16 w-16 shrink-0 rounded-md border border-stone-200 bg-stone-100 object-contain p-2 dark:border-stone-800 dark:bg-stone-900"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
          {item.title}
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {formatCurrency(item.price)} / unidade
        </p>
      </div>

      <div
        role="group"
        aria-label={`Quantidade de ${item.title}`}
        className="flex items-center gap-3 rounded-md border border-stone-300 dark:border-stone-700"
      >
        <button
          type="button"
          onClick={() => decreaseQuantity(item.id)}
          aria-label="Diminuir quantidade"
          className="flex h-8 w-8 items-center justify-center text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
        >
          <MinusIcon className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-5 text-center text-sm font-semibold text-stone-900 dark:text-stone-50">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => increaseQuantity(item.id)}
          aria-label="Aumentar quantidade"
          className="flex h-8 w-8 items-center justify-center text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="w-24 text-right font-display text-sm font-semibold text-stone-900 dark:text-stone-50">
        {formatCurrency(item.price * item.quantity)}
      </p>

      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remover ${item.title} do carrinho`}
        className="flex h-8 w-8 items-center justify-center rounded-md text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}