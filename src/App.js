import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './components/Root';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
          <Root/>
     </BrowserRouter>
    </div>
  );
}

export default App;
