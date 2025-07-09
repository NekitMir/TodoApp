import styles from "../SortedTasks/SortedTasks.module.css";

export const SortedTasks = ({ sortOrder, setSortOrder }) => {
  return (
    <div className={styles.wrapperSort}>
      <label htmlFor="sort" className={styles.lableSort}>
        Сортировка:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={({ target }) => setSortOrder(target.value)}
        className={styles.sortSelect}
      >
        <option className={styles.option} value="none">
          Без сортировки
        </option>
        <option className={styles.option} value="asc">
          А ➞ Я
        </option>
        <option className={styles.option} value="desc">
          Я ➞ А
        </option>
      </select>
    </div>
  );
};
