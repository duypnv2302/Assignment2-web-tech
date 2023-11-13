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

   