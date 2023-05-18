import { useState } from 'react';
import styles from './Searchbar.module.css';

const Searchbar = (props) => {
  const [term, setTerm] = useState('');
  const search = () => {
    term ? props.onSearch(term) : props.getLocalStorage();
  };
  const updateTerm = (e) => {
    setTerm(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div>
      <input
        className={styles.inputSearchbar}
        value={term}
        onKeyDown={onKeyDown}
        onChange={updateTerm}
        type="text"
        placeholder="Wyszukaj..."
      />
      <button onClick={search} className="btn btn-outline-dark">
        Szukaj
      </button>
    </div>
  );
};

export default Searchbar;
