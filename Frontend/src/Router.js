import React from 'react'
import { Route,Routes, BrowserRouter,Navigate} from 'react-router-dom'
import Login from "../src/Components/Login"

export default function Router() {
    const [logged,setLogged] = useState(true);
  return (
    <div>
        <BrowserRouter>
          <Routes>
          <Route path="/Login" element={<Login login={logged} setLogin={setLogged} /> } />

          </Routes>

</BrowserRouter>
    </div>
  )
}
