import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { numberSubmitted } from '../../features/search/searchSlice';
import styles from './SearchForm.module.css';

function SearchForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const trimmed = value.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trimmed) return;
    dispatch(numberSubmitted(trimmed));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <label htmlFor="part-number" className="form-label">
        Артикул детали
      </label>
      <div className="input-group input-group-lg">
        <input
          id="part-number"
          className="form-control"
          type="search"
          autoComplete="off"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={!trimmed}>
          Найти
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
