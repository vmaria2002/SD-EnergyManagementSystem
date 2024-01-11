import {Route, Routes, useLocation} from "react-router-dom";
import Login from "./pages/login_page/Login";
import User from "./user_page/User";
import Admin from "./admin_page/Admin";
import Register from "./pages/register_page/Register";
import ManageUsers from "./admin_page/manage_page/ManageUsers";
import ManageDevices from "./admin_page/manage_page/ManageDevices";
import MyDevices from "./user_page/MyDevices";
import Welcome from "./pages/welcome_page/Welcome";
import Unauthorized from "./pages/unauthorized_page/Unauthorized";
import AddUser from "./admin_page/user_control/AddUser";
import ViewUser from "./admin_page/user_control/ViewUser";
import UpdateUser from "./admin_page/user_control/UpdateUser";
import AddDevice from "./device_page/AddDevice";
import ViewDevice from "./device_page/ViewDevice";
import UpdateDevice from "./device_page/UpdateDevice";
import AddDeviceForUser from "./admin_page/mapping_deviceForUser/AddDeviceForUser";
import UserExist from "./pages/unauthorized_page/UserExist";
import React, {useEffect} from "react";
import ManageAdmins from "./admin_page/manage_page/ManageAdmin";
import DeviceExist from "./pages/unauthorized_page/DeviceExist";
import { CookiesProvider, useCookies } from "react-cookie";

import {useNavigate} from "react-router-dom";
import ChatInterfaceForAdmin from "./chat/ChatInterfaceForAdmin";
import ChatInterfaceForUser from "./chat/ChatInterfaceForUser";


function App() {

    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookie] =useCookies(['status_autentificare', 'userRole', 'userID', 'user'])
    /*
    Pentru PREVIOUS page!!!
     */
    window.addEventListener('popstate', function(event) {
        window.location.reload()
        const previousPageUrl = window.history.state && window.history.state.previousUrl;
        const currentURL =window.location.href

        if ((currentURL === "http://localhost:3000/admin") && previousPageUrl==="http://localhost:3000/login"  ) {
            navigate('/unauthorized');
        }
    });

    useEffect(() => {


    }, [location, navigate, cookies]);

    return (
        <div className="App"><CookiesProvider>
         <Routes>
            <Route path="/" element={<Welcome />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/unauthorized" element={<Unauthorized />} />
             <Route path="/exist" element={<UserExist />} />
             <Route path="/deviceExist" element={<DeviceExist />} />


             <Route path="/user/:id" element={String(cookies.userRole) === "2" || document.cookie.includes("userRole=2")  ? <User/> : <Unauthorized />} />
             <Route path="/seeDevicesByUser/:id" element={String(cookies.userRole) === "2" || document.cookie.includes("userRole=2") ? <MyDevices/>  : <Unauthorized />} />

             <Route path="/admin" element={String(cookies.userRole) === "1" ? <Admin/> : <Unauthorized />} />


             <Route path="/unauthorized" element={<Unauthorized />} />

             <Route path="/chat/:id" element={<ChatInterfaceForAdmin/>} />
             <Route path="/chatulUserului/:id" element={<ChatInterfaceForUser/>} />


             <Route path="/manageUsers" element={String(cookies.userRole) === "1" ? <ManageUsers /> : <Unauthorized />} />
             <Route path="/manageDevices" element={String(cookies.userRole) === "1" ? <ManageDevices /> : <Unauthorized />} />
             <Route path="/manageAdmin" element={String(cookies.userRole) === "1" ? <ManageAdmins /> : <Unauthorized />} />
             <Route path="/seeDevices/:id" element={String(cookies.userRole) === "1" || document.cookie.includes("userRole=1") ? <MyDevices/>  : <Unauthorized />}  />

            <Route path="/adduser" element={String(cookies.userRole) === "1" ? <AddUser /> : <Unauthorized/> }/>
            <Route exact path="/viewuser/:id" element={String(cookies.userRole) === "1" ? <ViewUser />:  <Unauthorized/> }/>
            <Route exact path="/update/:id" element={String(cookies.userRole) === "1" ? <UpdateUser />: <Unauthorized/> }/>
            <Route path="/createDevice" element={String(cookies.userRole) === "1" ? <AddDevice /> : <Unauthorized/> }/>
            <Route exact path="/viewdevice/:id" element={String(cookies.userRole) === "1" ?  <ViewDevice />: <Unauthorized/> }/>
            <Route exact path="/updateDevice/:id"  element={String(cookies.userRole) === "1" ?  <UpdateDevice /> :  <Unauthorized/> }/>
            <Route exact path="/addDeviceForUser/:id"  element={String(cookies.userRole) === "1" ? <AddDeviceForUser /> :  <Unauthorized/> }/>



    </Routes>
        </CookiesProvider>
        </div>
    );
}

export default App;
