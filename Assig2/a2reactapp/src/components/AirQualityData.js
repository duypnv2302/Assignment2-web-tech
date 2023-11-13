import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CityAirQuality = () => {
    const { cityId } = useParams();
    const [cityAirQualityData, setCityAirQualityData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => setCityAirQualityData(data))
            .catch(error => console.error('Error:', error));
    }, [cityId]);

    if (!cityAirQualityData) {
        return <div>Loading...</div>;
    }

    const { theCityDetail, theCityAirQualityData } = cityAirQualityData;

    return (
        <div className="city-air-quality-container">
            <h1>Air Quality Data for {theCityDetail.cityName}</h1>
            <p>Country: {theCityDetail.countryName}</p>
            <p>Region: {theCityDetail.regionName}</p>
            <img src={theCityDetail.imageUrl} alt={theCityDetail.cityName} />

            <div className="air-quality-data">
                {theCityAirQualityData.map((data, index) => (
                    <div key={index} className="air-quality-year">
                        <h2>Year: {data.year}</h2>
                        <p>PM10 Average: {data.countryPM10Avg}</p>
                        <p>PM10 Range: {data.countryPM10Min} - {data.countryPM10Max}</p>
                        <p>PM2.5 Average: {data.countryPM25Avg}</p>
                        <p>PM2.5 Range: {data.countryPM25Min} - {data.countryPM25Max}</p>
                    </div>
                ))}
            </div>

            <Link to={`/city/${theCityDetail.countryID}`} className="btn btn-primary">Back to City List</Link>
        </div>
    );
};

export default CityAirQuality;
