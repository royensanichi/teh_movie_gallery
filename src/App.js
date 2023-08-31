import './App.css';
import ListMovie from './components/ListMovie';
import Helmet from './components/Helmet';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
        <Helmet />
      <header className="App-header">
       
        <ListMovie />
      </header>
      <Footer/>
    </div>
  );
}

export default App;
