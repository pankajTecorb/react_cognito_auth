import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import VerifyEmail from './component/VerifyEmail';
import ForgotPassword from './component/ForgotPassword';
import ForgotPasswordReset from './component/ForgotPasswordReset';
import UserList from './component/UserList';
import ChangePassword from './component/ChangePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-reset" element={<ForgotPasswordReset />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
