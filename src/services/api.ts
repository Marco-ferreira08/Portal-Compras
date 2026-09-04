import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  return handleResponse<Product[]>(response);
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse<Product>(response);
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return handleResponse<string[]>(response);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  return handleResponse<Product[]>(response);
}