import Weather from './Components/weather';
//import './App.css';

function App() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center font-monospace">
      <div className="container text-center p-4 bg-light rounded shadow">
        <h1 className="display-4 fw-semibold">Weather App</h1>
      </div>
      <div className="container mt-4 pb-4 shadow-lg rounded-4 bg-info-subtle">
        <Weather className="d-flex justify-content-center "/>
      </div>
    </div>
  );
}

export default App;
