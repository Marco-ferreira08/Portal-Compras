import { Link } from "react-router-dom";
import { BoxIcon } from "../icons/Icons";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}

export function EmptyState({ message, actionLabel, actionTo, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center text-stone-500 dark:text-stone-400">
      <BoxIcon className="h-9 w-9" />
      <p className="text-base">{message}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-md border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          {actionLabel}
        </button>
      )}

      {actionLabel && actionTo && !onAction && (
        <Link
          to={actionTo}
          className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}