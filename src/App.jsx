import { BrowserRouter , Route, Routes } from 'react-router-dom';
import AddEmp from './components/AddEmp';
import Home from './components/Home';
import EmployeeDetail from './components/EmployeeDetail';
import UpdateEmp from './components/UpdateEmp';
function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add-emp" element={<AddEmp/>}/>
        <Route path="/emp-detail/:id" element={<EmployeeDetail/>}/>
        <Route path="/update-emp/:id" element={<UpdateEmp />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
