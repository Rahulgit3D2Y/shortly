import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import { ThemeProvider } from '@mui/material';
import theme from "./theme";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Account" element={<Account />} />
    </Routes></ThemeProvider>
  );
};

export default App;
