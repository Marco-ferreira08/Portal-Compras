import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { ProductGridSkeleton } from "../../components/Loading/ProductGridSkeleton";
import { CategoryFilter } from "../../components/CategoryFilter/CategoryFilter";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 350);
  const hasSearch = debouncedQuery.trim().length > 0;

  const { products, loading, error, refetch } = useProducts(selectedCategory);
  const { categories } = useCategories();

  const filteredProducts = useMemo(() => {
    if (!hasSearch) return products;
    const query = debouncedQuery.trim().toLowerCase();
    return products.filter((product) => product.title.toLowerCase().includes(query));
  }, [products, debouncedQuery, hasSearch]);

  const countLabel =
    filteredProducts.length === 1
      ? "1 produto disponível"
      : `${filteredProducts.length} produtos disponíveis`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
          Eletrônicos, joias e moda em um só lugar.
        </h1>
        <p className="mt-3 text-stone-600 dark:text-stone-400">
          {loading ? "Carregando catálogo..." : `${countLabel} para você explorar.`}
        </p>
      </section>

      <section className="mb-8 flex flex-col gap-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>

      {loading && <ProductGridSkeleton />}

      {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState
          message={
            hasSearch
              ? `Nenhum produto encontrado para "${debouncedQuery.trim()}".`
              : "Nenhum produto encontrado nesta categoria."
          }
          actionLabel={hasSearch ? "Limpar busca" : "Ver todas as categorias"}
          onAction={() => {
            if (hasSearch) {
              setSearchQuery("");
            } else {
              setSelectedCategory("all");
            }
          }}
        />
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid products={filteredProducts} />
      )}
    </main>
  );
}