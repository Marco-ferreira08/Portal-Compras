import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCart } from "../../hooks/useCart";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className={styles.card}>
      <Link to={`/produto/${product.id}`} className={styles.imageLink}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </Link>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>

        <Link to={`/produto/${product.id}`} className={styles.title}>
          {product.title}
        </Link>

        {product.rating && (
          <p className={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count})
          </p>
        )}

        <p className={styles.price}>{formatCurrency(product.price)}</p>

        <button
          type="button"
          className={styles.addButton}
          onClick={() => addToCart(product)}
        >
          Adicionar ao carrinho
        </button>
         </div>
    </article>
  );
}