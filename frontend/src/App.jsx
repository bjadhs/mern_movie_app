import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <main>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </main>
  )
}

export default App