import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';

const CountryCard = () => {
    const [country, setCountry] = useState([]);
    const { countryId, regionId } = useParams();


    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${regionId}`)
            .then(response => response.json())
            .then(data => setCountry(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="row">
            {country.length > 0 ? (
                country.map(country => (
                    <div key={country.countryId} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={country.imageUrl} className="card-img-top" alt={country.countryName} />
                            <div className="card-body">
                                <h5 className="card-title">{country.countryName}</h5>
                            </div>
                            <Link to={`/city/${country.countryId}`} className="btn btn-primary"> View Cities </Link>
                            <Link to={`/country/${country.countryId}`} className="btn btn-primary"> View Temperature and Emission Data </Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>No countries found.</p>
            )}
        </div>
    )
}

export default CountryCard



