import Home from "./Home";
import { Route, Routes } from 'react-router-dom';
import Sub from "./Sub";

function App() {
  return (
  
    <Routes>
    <Route path = "/" element={<Home />} />
    <Route path = "/sub" element={<Sub />} />

    </Routes>
    
  );
}

export default App;
