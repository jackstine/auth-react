import './App.css';
import Header from './components/Header'

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        {props.children}
      </header>
    </div>
  );
}

export default App;
