import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmissionData = () => {
    const { countryId } = useParams();
    const [summaryData, setSummaryData] = useState([]);
    const [detailedData, setDetailedData] = useState([]);
    const [elementList, setElementList] = useState([]);
    const [selectedElement, setSelectedElement] = useState('');

    // Fetch Summary Emission Data and Element List
    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${countryId}`)
            .then(response => response.json())
            .then(data => setSummaryData(data))
            .catch(error => console.error('Error:', error));

        fetch('http://localhost:5256/api/B_Countries/GetElementList')
            .then(response => response.json())
            .then(data => setElementList(data))
            .catch(error => console.error('Error:', error));
    }, [countryId]);

    // Fetch Detailed Emission Data
    const fetchDetailedData = (elementId) => {
        fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${countryId}?elementId=${elementId}`)
            .then(response => response.json())
            .then(data => setDetailedData(data))
            .catch(error => console.error('Error:', error));
    };


    // Handle Element Selection
    const handleElementChange = (e) => {
        setSelectedElement(e.target.value);
        fetchDetailedData(e.target.value);
    };

    return (
        <div>
            <h2>Emission Data</h2>
            <div>
                <label htmlFor="elementSelect">Filter by Element:</label>
                <select id="elementSelect" onChange={handleElementChange}>
                    <option value="">Select an Element</option>
                    {elementList.map(element => (
                        <option key={element.elementId} value={element.elementId}>
                            {element.elementName}
                        </option>
                    ))}
                </select>
            </div>

            <h3>Summary Data</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Element</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {summaryData.map(item => (
                        <tr key={`${item.year}-${item.element}`}>
                            <td>{item.year}</td>
                            <td>{item.element}</td>
                            <td>{item.totalValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedElement && (
                <>
                    <h3>Detailed Data for Selected Element</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Item Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailedData.map(item => (
                                <tr key={`${item.year}-${item.itemName}`}>
                                    <td>{item.year}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            <Link to="/countries" className="btn btn-primary">Back to Country List</Link>
        </div>
    );
};

export default EmissionData;
