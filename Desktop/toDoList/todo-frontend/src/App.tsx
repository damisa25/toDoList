import { Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import PrivateRoute from "./conponents/privateRoute";

const App = () => {
  return (
    <>  
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            }
          />
        </Routes>
    </>
  );
}

export default App;
