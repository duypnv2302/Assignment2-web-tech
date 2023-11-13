import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CityAirQuality = () => {
    const { cityId } = useParams();
    const [airQualityData, setAirQualityData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => setAirQualityData(data))
            .catch(error => console.error('Error fetching air quality data:', error));
    }, [cityId]);

    if (!airQualityData) {
        return <div>Loading...</div>;
    }

    const { theCityDetail, theCityAirQualityData } = airQualityData;

    return (
        <div>
            <h2>Air Quality Data for {theCityDetail.cityName}</h2>
            <img src={theCityDetail.imageUrl} alt={theCityDetail.cityName} />
            <p>Country: {theCityDetail.countryName}</p>
            <p>Region: {theCityDetail.regionName}</p>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>PM10 Average</th>
                        <th>PM10 Min</th>
                        <th>PM10 Max</th>
                        <th>PM2.5 Average</th>
                        <th>PM2.5 Min</th>
                        <th>PM2.5 Max</th>
                    </tr>
                </thead>
                <tbody>
                    {theCityAirQualityData.map(item => (
                        <tr key={item.year}>
                            <td>{item.year}</td>
                            <td>{item.countryPM10Avg}</td>
                            <td>{item.countryPM10Min}</td>
                            <td>{item.countryPM10Max}</td>
                            <td>{item.countryPM25Avg}</td>
                            <td>{item.countryPM25Min}</td>
                            <td>{item.countryPM25Max}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/city-list" className="btn btn-primary">Back to City List</Link>
        </div>
    );
};

export default CityAirQuality;
