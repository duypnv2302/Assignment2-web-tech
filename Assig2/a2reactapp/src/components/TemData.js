import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CountryCard from './CountryCard';


const TemData = () => {
    // const { countryId } = useParams();
    const [temData, setTemData] = useState(null);
    const [region, setRegion] = useState(null);
    let { countryId, regionId } = useParams();


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
    }, [countryId, regionId]);

    if (!temData) {
        return <div>Loading...</div>;
    }



    return (

        <>
            <CountryCard />
            <h2 className="text-center mb-2">Country Temperature Data</h2>
            {temData && (
                <div className="tem-container">
                    <h2>{temData.countryName} Temperature Data</h2>
                    <img src={temData.imageUrl} alt={temData.countryName} />
                    <p>Region: {temData.regionName}</p>
                    <p>Year Range: {temData.minYear} - {temData.maxYear}</p>
                </div>
            )}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Temperature</th>
                        <th>Unit</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {temData.map(({ theCountryTempData }) => (
                        <tr key={theCountryTempData.year}>
                            <td>{theCountryTempData.year}</td>
                            <td>{theCountryTempData.value}</td>
                            <td>{theCountryTempData.unit}</td>
                            <td>{theCountryTempData.change}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to={`/country/${temData.regionId}`} className="btn btn-primary">Back to Country List</Link>
        </>
    );
};

export default TemData;
