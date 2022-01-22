import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './components/Home'
import Tools from './components/Tools'
import SpotifyAuth from './components/spotifyAuth'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SpotifyAuth>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tools" element={<Tools />} />
          </Routes>
        </SpotifyAuth>
      </BrowserRouter>
    </div>
  );
}

export default App;
