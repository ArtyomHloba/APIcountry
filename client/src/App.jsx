import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CountryInfo from './components/CountryInfo/CountryInfo';

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country/:countryCode' element={<CountryInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
