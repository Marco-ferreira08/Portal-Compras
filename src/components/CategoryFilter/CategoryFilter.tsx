import styles from "./CategoryFilter.module.css";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className={styles.container} role="group" aria-label="Filtrar por categoria">
      <button
        type="button"
        className={selected === "all" ? styles.activeButton : styles.button}
        onClick={() => onSelect("all")}
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={selected === category ? styles.activeButton : styles.button}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}