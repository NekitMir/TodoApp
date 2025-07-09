import styles from "../Button/Button.module.css";

export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};
