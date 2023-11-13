import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CitySearch = () => {
    const { countryId } = useParams();
    const [cities, setCities] = useState([]);
    const [countryName, setCountryName] = useState('');
    const [regionName, setRegionName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

 useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/${countryId}`)
            .then(response => response.json())
            .then(data => {
                setCities(data.cities);
                setCountryName(data.countryName);
                setRegionName(data.regionName);
            })

            .catch(error => console.error('Error:', error));
 }, [countryId]);



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCities = cities.filter(city =>
        city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search cities"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div>
                {filteredCities.map(city => (
                    <div key={city.cityID}>
                        <h3>{city.cityName}</h3>
                        {city.airQualityYearRange && city.airQualityYearRange.length > 0 && (
                            <Link to={`/city/${city.cityID}/airquality`}>View Air Quality Data</Link>
                        )}
                    </div>
                ))}
            </div>

            <Link to="/country" className="btn btn-primary">Back to Country List</Link>
        </div>
    );
};

export default CitySearch;
