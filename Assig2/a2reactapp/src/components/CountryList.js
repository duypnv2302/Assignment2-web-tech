﻿import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import SearchCountry from './SearchCountry';

const CountryList = () => {
    const [region, setRegion] = useState(null);
    const [countries, setCountries] = useState([]);
    const { regionId } = useParams();

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
        <SearchCountry />
            {region && (
                <div>
                    <h1>{region.regionName}</h1>
                    <img src={region.imageUrl} alt={region.regionName} />
                </div>
            )}
       
            <div className="row">
                {countries.map(country => (
                    <div key={country.countryId} className="col-md-4 mb-3">
                        <div className="card" >
                            <img src={country.imageUrl} className="card-img-top" alt={country.countryName} />
                            <div className="card-body">
                                <h5 className="card-title">{country.countryName}</h5>
                            </div>
                            <Link to="/" className="btn btn-primary"> View city </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link to ="/region" className="btn btn-primary">Back to Regions</Link>
        </div>
    );
};

export default CountryList;
