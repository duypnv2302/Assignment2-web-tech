import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmissionAndTemData = () => {
    const { countryId } = useParams();
    const [temData, setTemData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryTemperatureDetail/${countryId}`)
            .then(response => response.json())
            .then(data => {
                setTemData(data);
            })
            .catch(error => {
                console.error('Error fetching temperature data:', error);
            });
    }, [countryId]);

    if (!temData) {
        return <div>Loading...</div>;
    }

    // We take the first entry of rawTemperatureData to extract country and region information
    // Assuming that country and region information is the same for all entries
    const countryInfo = temData.rawTemperatureData.length > 0 ? temData.rawTemperatureData[0].theCountryTempData.country : null;
    const regionInfo = countryInfo ? countryInfo.region : null;

    return (
        <>
            <h2 className="text-center mb-2">Country Temperature Data</h2>
            {countryInfo && (
                <div className="tem-container">
                    <h2>{countryInfo.countryName} Temperature Data</h2>
                    <img src={countryInfo.imageUrl} alt={countryInfo.countryName} />
                    <p>Region: {regionInfo ? regionInfo.regionName : 'N/A'}</p>
                    <p>Year Range: {temData.minYear} - {temData.maxYear}</p>
                </div>
            )}

            {temData.rawTemperatureData.map(({ theCountryTempData }) => (
                <div key={theCountryTempData.year} className="yearly-temperature-data">
                    <h3>Year: {theCountryTempData.year}</h3>
                    <p>Temperature: {theCountryTempData.value} {theCountryTempData.unit}</p>
                    <p>Change: {theCountryTempData.change}</p>
                </div>
            ))}
            <Link to="/countries" className="btn btn-primary">Back to Country List</Link>
        </>
    );
};

export default EmissionAndTemData;
