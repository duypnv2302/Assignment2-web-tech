import logo from './logo.svg';
import './App.css'; 
import { Link, Outlet } from "react-router-dom";

function App() {
    return (
      
          <div className="App container">
           
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">EnvData</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="Region">Region</a>
                            <a class="nav-link" href="Country">Country</a>
                            <a class="nav-link" href="City">City</a>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
          </div >

  );
}

export default App;
