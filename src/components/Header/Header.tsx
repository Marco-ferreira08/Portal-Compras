import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import styles from "./Header.module.css";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          Portal de Compras
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Produtos
          </Link>
          <Link to="/carrinho" className={styles.cartLink}>
            Carrinho
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}