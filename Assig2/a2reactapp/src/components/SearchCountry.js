import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';

function SearchCountry() {
    const [cardData, setCardData] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Use async function within useEffect for fetching data
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5256/api/B_Countries/CountrySearch?searchText=${query}`);
                const data = await response.json();
                setCardData(data);
            } catch (err) {
                console.error("Error fetching data: ", err);
            }
        };

        // Call fetchData function
        fetchData();
    }, [query]); // Dependency on query

    const searchQuery = (e) => {
        e.preventDefault(); // Prevent default form submit behavior
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
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            <div className="row">
                {cardData.map((country) => (
                    <div key={country.countryId} className="col-md-4 mb-3">
                        <CountryCard
                            countryId={country.countryId}
                            countryName={country.countryName}
                            imageUrl={country.imageUrl}
                        // other props if needed
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchCountry;
