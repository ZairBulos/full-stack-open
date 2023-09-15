function Country(props) {
    return (
        <>
            <h1>
                {props.country.name.common}
            </h1>
            <p>
                capital {props.country.capital}
            </p>
            <p>
                population {props.country.population}
            </p>
            <img
                src={props.country.flags.png}
                alt={props.country.name.common}
                height="100px"
            />
        </>
    );
}

export default Country;