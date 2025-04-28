import { Link } from 'react-router-dom';

function Button({ label, to, onClick, variant = 'primary' }) {
  const base = 'px-6 py-3 font-bold rounded shadow hover:shadow-lg transition';
  const styles = variant === 'primary'
    ? 'bg-orange-500 text-white'
    : 'bg-white text-blue-600';
  const classes = `${base} ${styles}`;

  return to
    ? <Link to={to}>
        <button className={classes}>{label}</button>
      </Link>
    : <button onClick={onClick} className={classes}>{label}</button>;
}
export { Button }