import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './Component/Landing page/landing';



function App() {
  return (
    <div className="App">
     <Router>
        <Routes>

        <Route exact path='/' element={<Landing />}/>
        
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
