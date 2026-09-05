import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

export function CartSummary() {
  const { totalItems, totalPrice, clearCart } = useCart();

  return (
    <div className="flex h-fit flex-col gap-4 rounded-lg border border-stone-200 p-6 dark:border-stone-800">
      <h2 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
        Resumo
      </h2>

      <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
        <span>Itens</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between border-t border-dashed border-stone-300 pt-4 font-display text-lg font-bold text-stone-900 dark:border-stone-700 dark:text-stone-50">
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>

      <button
        type="button"
        onClick={clearCart}
        className="mt-1 rounded-md border border-stone-300 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800"
      >
        Limpar carrinho
      </button>
    </div>
  );
}