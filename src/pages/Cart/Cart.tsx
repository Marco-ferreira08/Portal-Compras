import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../components/CartItem/CartItem";
import { CartSummary } from "../../components/CartSummary/CartSummary";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import styles from "./Cart.module.css";

export function Cart() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className={styles.container}>
        <EmptyState
          message="Seu carrinho está vazio."
          actionLabel="Continuar comprando"
          actionTo="/"
        />
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Seu carrinho</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary />
      </div>
    </main>
  );
}