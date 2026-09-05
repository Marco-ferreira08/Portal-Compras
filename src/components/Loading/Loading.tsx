interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16 text-stone-500 dark:text-stone-400"
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-brand-600 motion-reduce:animate-none dark:border-stone-700 dark:border-t-brand-400" />
      <p className="text-sm">{message}</p>
    </div>
  );
}