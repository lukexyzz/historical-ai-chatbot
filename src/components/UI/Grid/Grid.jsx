import React from "react";
import styles from "./Grid.module.css";

/**
 * A reusable grid component that renders a list of items or an empty state.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.items - The array of items to render.
 * @param {Function} props.renderItem - A function that returns the JSX for a single item.
 * @param {React.ReactNode} [props.emptyState] - The content to display when there are no items.
 * @param {string} [props.className] - Optional additional class names for the grid container.
 * @returns {JSX.Element} The rendered grid or empty state.
 */
export default function Grid({
  items,
  renderItem,
  emptyState,
  className = "",
}) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.emptyState}>
        {emptyState || <p>No items found.</p>}
      </div>
    );
  }

  return (
    <section className={`${styles.grid} ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={item.id || index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </section>
  );
}
