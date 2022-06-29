import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './components/Home'
import Tools from './components/Tools'
import SpotifyAuth from './components/spotifyAuth'
import { Toaster } from 'react-hot-toast'


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
        <Toaster
          position="top-right"
          toastOptions={{
            className: "font-medium",
            duration: 3000,
            success: {
              className: 'border-2 border-green-500 font-medium'
            }
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
