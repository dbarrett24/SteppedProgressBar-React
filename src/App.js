import './App.css';
import SteppedProgressBar from './components/progressbar/SteppedProgressBar'

const descriptionEntries = [
  {
    text: "Thing 1",
    denied: false,
    description: "",
    complete: false
  },
  {
    text: "Thing 2",
    denied: false,
    description: "",
    complete: false
  },
  {
    text: "Thing 3",
    denied: false,
    description: "",
    complete: false
  },
  {
    text: "Thing 4",
    denied: false,
    description: "",
    complete: false
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <SteppedProgressBar
          descriptionEntries={descriptionEntries}
          deniedStatus={true}
        />
      </header>
    </div>
  );
}

export default App;
