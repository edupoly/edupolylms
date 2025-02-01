import logo from './logo.svg';
import './App.css';
import Question from './feature/question/Question';
import AddTechnology from './feature/admin/AddTechnology';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './feature/admin/AdminDashboard';
import Adminnavabar from './feature/navabars/adminnavabar';

function App() {
  return (
    <div className='container mt-4'>
          <Adminnavabar></Adminnavabar>
         <Outlet></Outlet>
    </div>
  );
}

export default App;
