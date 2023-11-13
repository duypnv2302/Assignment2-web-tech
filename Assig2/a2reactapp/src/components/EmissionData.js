import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryEmissionData = () => {
    const { countryId } = useParams();
    const [countryData, setCountryData] = useState(null);
    const [emissionData, setEmissionData] = useState(null);
    const [elementList, setElementList] = useState([]);
    const [selectedElement, setSelectedElement] = useState('');

    // Fetch Country and Emission Data
    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${countryId}`)
            .then(response => response.json())
            .then(data => setCountryData(data))
            .catch(error => console.error('Error:', error));

        fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${countryId}`)
            .then(response => response.json())
            .then(data => {
                setEmissionData(data.countryEmissions); 
            })
            .catch(error => console.error('Error:', error));
    }, [countryId]);

    // Fetch Element List
    useEffect(() => {
        fetch('http://localhost:5256/api/B_Countries/GetElementList')
            .then(response => response.json())
            .then(data => setElementList(data))
            .catch(error => console.error('Error:', error));
    }, []);

    