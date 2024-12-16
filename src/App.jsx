import logo from './logo.svg';
import './App.css';
import Question from './feature/question/Question';
import AddTechnology from './feature/admin/AddTechnology';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './feature/admin/AdminDashboard';

function App() {
  return (
    <div className='border m-2 '>
          APP
         <Outlet></Outlet>
    </div>
  );
}

export default App;
