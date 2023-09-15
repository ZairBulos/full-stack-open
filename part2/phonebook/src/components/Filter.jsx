function Filter(props) {
    return(
        <div>
            filter shown with 
            <input
                id="filter"
                name="filter"
                value={props.filter}
                onChange={props.handleFilter}
            />
        </div>
    );
}

export default Filter;