import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import Followers from './components/Followers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repos/:username" element={<RepositoryList />} />
        <Route path="/repo/:username/:repoName" element={<RepositoryDetails />} />
        <Route path="/followers/:username" element={<Followers />} />
      </Routes>
    </Router>
  );
}

export default App;
