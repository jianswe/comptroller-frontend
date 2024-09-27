import React from 'react';
import ComptrollerData from './components/ComptrollerData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComptrollerData />} />
      </Routes>
    </Router>
  );
}

export default App;
