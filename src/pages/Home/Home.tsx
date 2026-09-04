import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { CategoryFilter } from "../../components/CategoryFilter/CategoryFilter";
import { Loading } from "../../components/Loading/Loading";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import styles from "./Home.module.css";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { products, loading, error, refetch } = useProducts(selectedCategory);
  const { categories } = useCategories();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Nossos produtos</h1>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {loading && <Loading message="Carregando produtos..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && <ProductGrid products={products} />}
    </main>
  );
}