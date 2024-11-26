import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import BuildSection from './components/BuildSection';
import Offers from './components/Offers';
import Benifits from './components/Benifits';
import Specialties from './components/Specialties';
import LearnMore from './components/LearnMore';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import Chat from './components/Chat';

const drinks = require('./drinks_list.json')

function App() {
  return (
    <div className="App">

      <Navbar />
      <BuildSection drinks={drinks}/>
      <Offers />
      <Benifits />
      <Specialties />
      <LearnMore />
      <Footer />
      <Chat />

    </div>
  );
}

export default App;

