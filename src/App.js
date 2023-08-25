import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Account" element={<Account />} />
    </Routes>
  );
};

export default App;
