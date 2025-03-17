import Error from '../pages/Error/Error';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import paths from './routes';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Layout from '../components/Layout/Layout';
import AllProducts from '../components/AllProducts/AllProducts';
import SignUp from '../pages/SignUp/SignUp';
import LogIn from '../pages/LogIn/LogIn';


const RouterContainer = () => {
    return (
        <Router>
            <Routes>
                {/* public route */}
                <Route path={paths.LOGIN_PATH} element={<LogIn/>} />
                <Route path={paths.SIGNUP_PATH} element={<SignUp />} />
                {/* private routes */}
                <Route element={<PrivateRoute />}>
                    <Route path={paths.ROOT_PATH} element={<Layout />}>
                        <Route index element={<AllProducts />} />
                    </Route>

                </Route>

                {/* error */}
                <Route path={paths.ERROR_PATH} element={<Error />} />
                <Route path="*" element={<Navigate to="/error" />} />
            </Routes>
        </Router>
    );
};

export default RouterContainer;
