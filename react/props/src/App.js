import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import All from './All'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/All' element={<All />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
