import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types/product";
import { getProductById } from "../services/api";

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  refetch: () => void;
}

export function useProduct(id: number | undefined): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  useEffect(() => {
    if (id === undefined || Number.isNaN(id)) {
      setLoading(false);
      setNotFound(true);
      setProduct(null);
      setError(null);
      return;
    }

    let ignore = false;

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const data = await getProductById(id as number);
        if (ignore) return;
        if (!data) {
          setNotFound(true);
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch {
        if (!ignore) setError("Não foi possível carregar o produto.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id, reloadFlag]);

  const refetch = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  return { product, loading, error, notFound, refetch };
}