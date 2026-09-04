import { Link } from "react-router-dom";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ message, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className={styles.actionLink}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}