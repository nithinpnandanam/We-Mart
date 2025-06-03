import Error from "@/pages/Error/Error";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import paths from "./routes";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Layout from "@/components/Layout/Layout";
import AllProducts from "@/components/AllProducts/AllProducts";
import SignUp from "@/pages/SignUp/SignUp";
import LogIn from "@/pages/LogIn/LogIn";
import UserList from "@/components/UserList/UserList";
import RoleProtectedRoute from "@/components/RoleProtectedRoute/RoleProtectedRoute";
import MyProfile from "@/components/MyProfile/MyProfile";
import { FC, ReactNode } from "react";
import AboutUs from "@/components/AboutUs/AboutUs";
import FileUpload from "@/components/FileUpload/FileUpload";

type RouterContainerProps = {
 children:ReactNode
}

const RouterContainer:FC<RouterContainerProps> = ({children}) => {
  return (
    
    <Router>
      {children}
      <Routes>
        {/* public route */}
        <Route path={paths.LOGIN_PATH} element={<LogIn />} />
        <Route path={paths.SIGNUP_PATH} element={<SignUp />} />
        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path={paths.ROOT_PATH} element={<Layout />}>
            <Route index element={<AllProducts />} />
            <Route element={<RoleProtectedRoute allowedRoles={["admin",'manager']} />}>
              <Route path={paths.USER_LIST} element={<UserList />} />
            </Route>
            <Route element={<RoleProtectedRoute allowedRoles={["user"]} />}>
              <Route  path={paths.PROFILE_VIEW}element={<MyProfile />} />
            </Route>
            <Route path={paths.ABOUT_US} element={<AboutUs />} />
            <Route path={paths.FILE_UPLOAD} element={<FileUpload/>}>
            </Route>
          </Route>
        </Route>

        {/* error */}
        <Route path={paths.ERROR_PATH} element={<Error />} />
        {/* <Route path="*" element={<Navigate to="/error" />} /> */}
      </Routes>
    </Router>
  );
};

export default RouterContainer;
