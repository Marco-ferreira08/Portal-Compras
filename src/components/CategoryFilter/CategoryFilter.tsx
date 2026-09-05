import { capitalizeFirst } from "../../utils/text";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const allOptions = ["all", ...categories];

  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
    >
      {allOptions.map((category) => {
        const isActive = selected === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
              isActive
                ? "border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500"
                : "border-stone-300 text-stone-600 hover:border-stone-400 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-600"
            }`}
          >
            {category === "all" ? "Todas" : capitalizeFirst(category)}
          </button>
        );
      })}
    </div>
  );
}