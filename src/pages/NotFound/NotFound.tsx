import { Link } from "react-router-dom";
import { BoxIcon } from "../../components/icons/Icons";

export function NotFound() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
      <BoxIcon className="h-10 w-10 text-stone-400" />
      <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-50">
        Página não encontrada
      </h1>
      <p className="text-stone-600 dark:text-stone-400">
        O endereço acessado não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
      >
        Voltar aos produtos
      </Link>
    </main>
  );
}