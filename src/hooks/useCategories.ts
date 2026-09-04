import { useState, useEffect, useCallback } from "react";
import { getCategories } from "../services/api";

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function fetchCategories() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategories();
        if (!ignore) setCategories(data);
      } catch {
        if (!ignore) setError("Não foi possível carregar as categorias.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchCategories();

    return () => {
      ignore = true;
    };
  }, [reloadFlag]);

  const refetch = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  return { categories, loading, error, refetch };
}