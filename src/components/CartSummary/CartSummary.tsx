import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";
import styles from "./CartSummary.module.css";

export function CartSummary() {
  const { totalItems, totalPrice, clearCart } = useCart();

  return (
    <div className={styles.summary}>
      <h2 className={styles.heading}>Resumo</h2>

      <div className={styles.row}>
        <span>Itens</span>
        <span>{totalItems}</span>
      </div>

      <div className={styles.rowTotal}>
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>

      <button type="button" onClick={clearCart} className={styles.clearButton}>
        Limpar carrinho
      </button>
    </div>
  );
}