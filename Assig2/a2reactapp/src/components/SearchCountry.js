import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryCard from '../components/CountryCard';

function SearchCountry() {
    const [cardData, setCardData] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // Using useNavigate hook to navigate programmatically

    useEffect(() => {
        if (query.length === 0) {
            setCardData([]);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5256/api/B_Countries/CountrySearch?searchText=${query}`);
                const data = await response.json();
                setCardData(data);
            } catch (err) {
                console.error("Error fetching data: ", err);
            }
        };

        const timeoutId = setTimeout(() => fetchData(), 500); // Debounce the search
        return () => clearTimeout(timeoutId);
    }, [query]);

    const searchQuery = (e) => {
        e.preventDefault();
        const value = e.target.elements.searchText.value.trim();
        setQuery(value);
    };

    return (
        <div id="cardListSearch">
            <form className="row justify-content-start mb-3" onSubmit={searchQuery}>
                <div className="col-3">
                    <input
                        type="text"
                        name="searchText"
                        className="form-control"
                        placeholder="Type a country name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="col text-left">
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            <div className="row">
                {cardData.map((country) => (
                    <div key={country.countryId} className="col-md-4 mb-3">
                        <div className="card" onClick={() => navigate(`/country/${country.countryId}`)}>
                            <img src={country.imageUrl} className="card-img-top" alt={country.countryName} />
                            <div className="card-body">
                                <h5 className="card-title">{country.countryName}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchCountry;
