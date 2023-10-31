import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RegionList = () => {
    const [regions, setRegions] = useState([]);
   
    useEffect(() => {
        fetch('http://localhost:5256/api/A_Regions') 
            .then(response => response.json())
            .then(data => setRegions(data))
            .catch(error => console.error('Error fetching regions:', error));
    }, []);

    return (
        <div className="container">
            <h2>Regions</h2>
            <div className="row">
                {regions.map(region => (
                    
                    <div key={region.regionId} className="col-md-4 mb-3">
                        <Link to={"/country/" + region.regionId}>
                        <div className="card">
                            <img src={region.imageUrl} className="card-img-top" alt={region.regionName} />
                            <div className="card-body">
                                <h5 className="card-title">{region.regionName}</h5>
                                <p className="card-text">Countries: {region.countryCount}</p>
         
                            </div>
                            </div>
                        </Link>
                        </div>
                    
                ))}
            </div>
        </div>
    );
};

export default RegionList;
