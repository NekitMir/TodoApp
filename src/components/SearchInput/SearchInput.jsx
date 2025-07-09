import styles from '../SearchInput/SearchInput.module.css'

export const SearchInput = ({ searchValue, setSearchValue }) => {
  return (
    <input
      className={styles.searchInput}
      placeholder='Найти задачу'
      type="text"
      value={searchValue}
      onChange={({ target }) => setSearchValue(target.value)}
    />
  );
};
