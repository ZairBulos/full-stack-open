import Country from "./Country";

function Countries(props) {
    return (
        <>
            {
                props.countries.length === 1 ? (
                    <Country country={props.countries[0]} />
                ) : props.countries.length < 10 ? (
                    <ul>
                        {props.countries.map(country =>
                            <li key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => props.setCountries([country])}>
                                    show
                                </button>
                            </li>
                        )}
                    </ul>
                ) : (
                    <p>To many matches, specify another filter</p>
                )
            }
        </>
    );
}

export default Countries;