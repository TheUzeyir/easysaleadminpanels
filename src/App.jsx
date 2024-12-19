import {BrowserRouter,Routes,Route} from "react-router-dom"
import Main from "./page/main/Main"
import ComponentsPage from "./components/categoryComonents/componentMain/Component"
import ComponentsAdd from "./components/categoryComonents/componentsAdd/ComponentsAdd"
import Login from "./page/login/Login"
import UserInfo from "./components/userComponents/userInfo/UserInfo"
import Parametrs from "./components/parametrComponents/parametrs/Parameters"
import ParametrAdd from "./components/parametrComponents/parametrsAdd/ParametrAdd"
import UsersPage from "./components/userComponents/usersPage/UsersPage"
import ParametrType from "./components/parametrTypeComponents/parametrtype/ParametrType"
import Mask from "./components/maskComponents/mask/Mask"
import ProductDetail from "./page/productDetail/ProductDetail"
import ProductCompoonent from "./components/productCompoonent/ProductCompoonent"
import CityComponent from "./components/city/cityComponents/City"
import CityAdd from "./components/city/cityAdd/CityAdd"
import ProductComponent from "./components/productCompoonent/ProductCompoonent"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<ComponentsPage/>}/>
        <Route path="/category" element={<ComponentsPage/>}/>
        <Route path="/componentsAdd" element={<ComponentsAdd/>}/>
        <Route path="/userInfo" element={<UserInfo/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/parametrs" element={<Parametrs/>}/>
        <Route path="/parametrAdd" element={<ParametrAdd/>}/>
        <Route path="/ProductCompoonent" element={<ProductComponent/>}/>
        <Route path="/city" element={<CityComponent/>}/>
        <Route path="/cityAdd" element={<CityAdd/>}/>
        <Route path="/users" element={<UsersPage/>}/> 
        <Route path="/parametrType" element={<ParametrType/>}/>
        <Route path="/mask" element={<Mask/>}/>
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/productCompoonent" element={<ProductCompoonent/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App