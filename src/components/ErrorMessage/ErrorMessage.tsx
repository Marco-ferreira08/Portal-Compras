import { AlertIcon } from "../icons/Icons";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center" role="alert">
      <AlertIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
      <p className="text-sm text-stone-700 dark:text-stone-300">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-md bg-brand-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}