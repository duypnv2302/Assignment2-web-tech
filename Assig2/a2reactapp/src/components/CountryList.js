import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CountryList = () => {
    const [region, setRegion] = useState(null);
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { regionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${regionId}`)
            .then(response => response.json())
            .then(data => {
                setRegion(data.theRegion);
                setCountries(data.countryList);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, [regionId]);


    return (
        <div className="container">
            {region && (
                <div>
                    <h1>{region.regionName}</h1>
                    <img src={region.imageUrl} alt={region.regionName} />
                </div>
            )}
       
            <div className="row">
                {countries.map(country => (
                    <div key={country.countryId} className="col-md-4 mb-3">
                        <div className="card" onClick={() => navigate(`/country-detail/${country.countryId}`)}>
                            <img src={country.imageUrl} className="card-img-top" alt={country.countryName} />
                            <div className="card-body">
                                <h5 className="card-title">{country.countryName}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Back to Regions</button>
        </div>
    );
};

export default CountryList;
