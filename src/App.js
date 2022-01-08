import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './components/Home'
import Tools from './components/Tools'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tools" element={<Tools />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
