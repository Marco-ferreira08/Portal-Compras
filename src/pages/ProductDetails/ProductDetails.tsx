import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";
import { Loading } from "../../components/Loading/Loading";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import styles from "./ProductDetails.module.css";

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
      <div className={styles.notFound}>
        <p>Produto não encontrado.</p>
        <Link to="/" className={styles.backLink}>
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
    <main className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Voltar aos produtos
      </Link>

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.title} className={styles.image} />
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>

          {product.rating && (
            <p className={styles.rating}>
              ⭐ {product.rating.rate} ({product.rating.count} avaliações)
            </p>
          )}

          <p className={styles.price}>{formatCurrency(product.price)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.quantityRow}>
            <span className={styles.quantityLabel} id="quantity-label">
              Quantidade
            </span>
            <div className={styles.quantityControl} role="group" aria-labelledby="quantity-label">
              <button
                type="button"
                onClick={handleDecrease}
                aria-label="Diminuir quantidade"
                className={styles.quantityButton}
              >
                −
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Aumentar quantidade"
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>

          <button type="button" className={styles.addButton} onClick={handleAddToCart}>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </main>
  );
}