import React, { useState } from 'react'
import CountryCard from '../components/CountryCard';


function SearchCountry() {
    const [cardData, setCardData] = useState([]);
    const [query, setQuery] = useState('');

    React.useEffect(() => {
        console.log("useEffect");
        fetch(`http://localhost:5256/api/B_Countries/CountrySearch?searchText=${query}`)
            .then(response => response.json())
            .then(data => setCardData(data))
            .catch(err => {
                console.log(err);
            });
    }, [query])

    function searchQuery() {
        const value = document.querySelector('[name="searchText"]').value;
        alert('value: ' + value);
        setQuery(value);
    }

    return (
        <div id="cardListSearch">
            <div className="row justify-content-start mb-3">
                <div className="col-3">
                    <input type="text" name="searchText" className="form-control" placeholder="Type a country name" />
                </div>
                <div className="col text-left">
                    <button type="button" className="btn btn-primary" onClick={searchQuery}>Search</button>
                </div>
            </div>


            <div id="cardListSearch" className="row">
                {cardData.map((country) => (
                    <div key={country.countryId} className="col-md-4 mb-3">
                        <div className="card" >
                            <img src={country.imageUrl} className="card-img-top" alt={country.countryName} />
                            <div className="card-body">
                                <h5 className="card-title">{country.countryName}</h5>
                            </div>
                        </div>
                    </div>
                )
                )
                }
            </div>
        </div>
    )
}

export default SearchCountry;