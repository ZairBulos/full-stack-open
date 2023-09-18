import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

function Filter() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(filterChange(value));
  };

  return(
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
}

export default Filter;