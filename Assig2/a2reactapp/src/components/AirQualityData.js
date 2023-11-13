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

    