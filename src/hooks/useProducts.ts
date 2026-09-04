import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types/product";
import { getProducts, getProductsByCategory } from "../services/api";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(category?: string): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const data =
          category && category !== "all"
            ? await getProductsByCategory(category)
            : await getProducts();
        if (!ignore) setProducts(data);
      } catch {
        if (!ignore) setError("Não foi possível carregar os produtos.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, [category, reloadFlag]);

  const refetch = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  return { products, loading, error, refetch };
}