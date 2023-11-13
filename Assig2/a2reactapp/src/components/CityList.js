import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CitySearch = () => {
    const { countryId } = useParams();
    const [cities, setCities] = useState([]);
    const [countryName, setCountryName] = useState('');
    const [regionName, setRegionName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

   