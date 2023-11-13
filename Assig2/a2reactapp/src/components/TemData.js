import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


const TemData = () => {
    const { countryId } = useParams();
    const [temData, setTemData] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryTemperatureDetail/${countryId}`)
            .then(response => response.json())
            .then((data) => {
                setTemData(data.rawTemperatureData);
                setRegion(data.region);
            })
            .catch(error => {
                console.error('Error fetching temperature data:', error);
            });
    }, [countryId]);

    if (!temData) {
        return <div>Loading...</div>;
    }

  

    return (
        
        <>
            <h2 className="text-center mb-2">Country Temperature Data</h2>
            {temData && (
                <div className="tem-container">
                    <h2>{temData.countryName} Temperature Data</h2>
                    <img src={temData.imageUrl} alt={temData.countryName} />
                    <p>Region: {temData.regionName}</p>
                    <p>Year Range: {temData.minYear} - {temData.maxYear}</p>
                </div>
            )}

            {temData.map(({ theCountryTempData }) => (
                <div key={theCountryTempData.year} className="yearly-temperature-data">
                    <h3>Year: {theCountryTempData.year}</h3>
                    <p>Temperature: {theCountryTempData.value} {theCountryTempData.unit}</p>
                    <p>Change: {theCountryTempData.change}</p>
                </div>
            ))}
            <Link to={`/region/${temData.regionId}`} className="btn btn-primary">Back to Country List</Link>
        </>
    );
};

export default TemData;
