import {BrowserRouter,Routes,Route} from "react-router-dom"
import Main from "./page/main/Main"
import ComponentsPage from "./components/componentsPages/component/Component"
import ComponentsAdd from "./components/addcomponents/componentsAdd/ComponentsAdd"
import Login from "./page/login/Login"
import UserInfo from "./components/componentsPages/userInfo/UserInfo"
import Parametrs from "./components/componentsPages/parametrs/Parametrs"
import ParametrAdd from "./components/addcomponents/parametrsAdd/ParametrAdd"
import UsersPage from "./components/componentsPages/usersPage/UsersPage"
import ParametrType from "./components/componentsPages/parametrtype/ParametrType"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/category" element={<ComponentsPage/>}/>
        <Route path="/componentsAdd" element={<ComponentsAdd/>}/>
        <Route path="/userInfo" element={<UserInfo/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/parametrs" element={<Parametrs/>}/>
        <Route path="/parametrAdd" element={<ParametrAdd/>}/>
        <Route path="/users" element={<UsersPage/>}/>
        <Route path="/parametrType" element={<ParametrType/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App