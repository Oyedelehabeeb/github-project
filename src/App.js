import './App.css';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Repo from './pages/Repo';
import OutletRoute from './components/outletRoute';
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='*' element = {<NotFoundPage />} />
          <Route path='/repo' element = {<OutletRoute />}>
            <Route path=':id' element = {<Repo />} />
          </Route>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
