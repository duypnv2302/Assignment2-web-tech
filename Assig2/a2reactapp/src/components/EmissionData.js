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
                setEmissionData(data.countryEmissions); // Adjust according to your API response
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

    // Element Filter Change Handler
    const handleElementChange = (e) => {
        setSelectedElement(e.target.value);
    };

    // Function to group emission data by year and element
    const getGroupedEmissionData = () => {
        let groupedData = {};
        if (emissionData && Array.isArray(emissionData)) {
            emissionData.forEach(emission => {
                const year = emission.year;
                if (!groupedData[year]) {
                    groupedData[year] = [];
                }
                groupedData[year].push(emission);
            });
        }
        return groupedData;
    };

    const groupedEmissionData = getGroupedEmissionData();

    return (
        <div className="container">
            {countryData && (
                <div>
                    <h2>{countryData.countryName}</h2>
                    <img src={countryData.imageUrl} alt={countryData.countryName} />
                    <p>Region: {countryData.regionName}</p>
                </div>
            )}

            <select value={selectedElement} onChange={handleElementChange}>
                <option value="">Select an Element</option>
                {elementList.map(element => (
                    <option key={element.elementId} value={element.elementName}>
                        {element.elementName}
                    </option>
                ))}
            </select>

            {Object.keys(groupedEmissionData).map(year => (
                <div key={year}>
                    <h3>Year: {year}</h3>
                    {groupedEmissionData[year]
                        .filter(data => selectedElement === '' || data.element === selectedElement)
                        .map((data, index) => (
                            <div key={index}>
                                <p>Element: {data.element}</p>
                                <p>Value: {data.value} {data.unit}</p>
                            </div>
                        ))
                    }
                </div>
            ))}

            <Link to="/country" className="btn btn-primary">Back to Country List</Link>
        </div>
    );
};

export default CountryEmissionData;