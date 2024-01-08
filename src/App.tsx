import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Home />
    </div>
  )
}

export default App