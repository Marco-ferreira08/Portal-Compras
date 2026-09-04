import type { CartItem as CartItemType } from "../../types/cart";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCart } from "../../hooks/useCart";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.item}>
      <img src={item.image} alt={item.title} className={styles.image} />

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.unitPrice}>{formatCurrency(item.price)} / unidade</p>
      </div>

      <div
        className={styles.quantityControl}
        role="group"
        aria-label={`Quantidade de ${item.title}`}
      >
        <button
          type="button"
          onClick={() => decreaseQuantity(item.id)}
          aria-label="Diminuir quantidade"
          className={styles.quantityButton}
        >
          −
        </button>
        <span className={styles.quantityValue}>{item.quantity}</span>
        <button
          type="button"
          onClick={() => increaseQuantity(item.id)}
          aria-label="Aumentar quantidade"
          className={styles.quantityButton}
        >
          +
        </button>
      </div>

      <p className={styles.subtotal}>{formatCurrency(item.price * item.quantity)}</p>

      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        className={styles.removeButton}
        aria-label={`Remover ${item.title} do carrinho`}
      >
        Remover
      </button>
    </div>
  );
}