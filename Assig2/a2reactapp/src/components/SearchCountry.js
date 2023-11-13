import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';

function SearchCountry() {
    const [cardData, setCardData] = useState([]);
    const [query, setQuery] = useState('');
    const [countryId, setCountryId] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5256/api/B_Countries/CountrySearch?searchText=${query}`);
                const data = await response.json();
                setCardData(data);
            } catch (err) {
                console.error("Error fetching data: ", err);
            }
        };

   
        fetchData();
    }, [query]);

    const searchQuery = (e) => {
        e.preventDefault(); 
        const value = document.querySelector('[name="searchText"]').value.trim();
        setQuery(value);
    }

    return (
        <div id="cardListSearch">
            <form className="row justify-content-start mb-3" onSubmit={searchQuery}>
                <div className="col-3">
                    <input type="text" name="searchText" className="form-control" placeholder="Type a country name" />
                </div>
                <div className="col text-left">
                    <Link to="CountryCard" onClick={(e) => { setCountryId() }} type="submit" className="btn btn-primary">Search</Link>
                </div>
            </form>

            <div className="row">
                {cardData.map((country) => (
                    <div key={country.countryId} className="col-md-4 mb-3">
                        <CountryCard
                            countryId={country.countryId}
                            countryName={country.countryName}
                            imageUrl={country.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchCountry;
