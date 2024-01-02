import './App.css';
import Header from './components/header/Header';
import CurrencyList from './components/CurrencyList/CurrencyList';
import Conversion from './components/Conversion/Conversion';
import Footer from './components/footer/Footer';
function App() {
  return (
    <>
    <Header />
    <Conversion />
    <CurrencyList />
    <Footer />
    </>
  );
}

export default App;
