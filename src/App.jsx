import {BrowserRouter,Routes,Route} from "react-router-dom"
import Main from "./page/main/Main"
import ComponentsPage from "./components/categoryComonents/componentMain/Component"
import ComponentsAdd from "./components/categoryComonents/componentsAdd/ComponentsAdd"
import Login from "./page/login/Login"
import UserInfo from "./components/userComponents/userInfo/UserInfo"
import Parametrs from "./components/parametrComponents/parametrs/Parametrs"
import ParametrAdd from "./components/parametrComponents/parametrsAdd/ParametrAdd"
import UsersPage from "./components/userComponents/usersPage/UsersPage"
import ParametrType from "./components/parametrTypeComponents/parametrtype/ParametrType"
import Mask from "./components/maskComponents/mask/Mask"

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
        <Route path="/mask" element={<Mask/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App