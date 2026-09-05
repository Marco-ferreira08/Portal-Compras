import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import { CartIcon, SunIcon, MoonIcon } from "../icons/Icons";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
    isActive
      ? "text-brand-600 dark:text-brand-400"
      : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
  }`;

export function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-stone-50"
        >
          Portal<span className="text-brand-500 dark:text-brand-400">Compras</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={navLinkClasses}>
            Produtos
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="rounded-md p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <NavLink to="/carrinho" className={navLinkClasses}>
            <span className="relative flex items-center gap-2">
              <CartIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-semibold text-white dark:bg-brand-500">
                  {totalItems}
                </span>
              )}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}