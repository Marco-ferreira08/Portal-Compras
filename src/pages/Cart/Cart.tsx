import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../components/CartItem/CartItem";
import { CartSummary } from "../../components/CartSummary/CartSummary";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function Cart() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <EmptyState
          message="Seu carrinho está vazio."
          actionLabel="Continuar comprando"
          actionTo="/"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-2xl font-bold text-stone-900 dark:text-stone-50">
        Seu carrinho
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary />
      </div>
    </main>
  );
}