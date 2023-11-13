import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegionList from "./components/RegionList";
import CountryList from "./components/CountryList";
import EmissionAndTemData from "./components/EmissionAndTemData";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/region" element={<RegionList />} />
                <Route path="/country/:regionId" element={<CountryList />} />
                {/*<Route path="/country/:countryId" element={<CountryDetail />} />*/}
                {/*<Route path="/city/:countryId" element={<CityList />} />*/}
                {/*<Route path="/city/:cityId" element={<CityDetail />} />*/}
                <Route path="/country/:countryId/temperature" element={<TemData />} />
                {/*<Route path="city/:cityId" element={<AirQualityData />} /> */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
