import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  return (
    <div className={styles.searchBox}>
      <label className={styles.label}>Find contacts by name</label>
      <input
        className={styles.inputSerch}
        type="text"
        placeholder="Enter name"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
}

export default SearchBox;
