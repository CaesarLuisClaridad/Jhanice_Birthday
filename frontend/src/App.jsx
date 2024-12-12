import HomePage from "./components/Pages/HomePage";
import VideoPlayer from "./components/layout/VideoPlayer"
import Gallery from "./components/Pages/Gallery";
import Greetings from "./components/Pages/Greetings";
import PostGreetings from "./components/Pages/PostGreetings";
import toast, {Toaster} from "react-hot-toast"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <div className="main-container bg-black">
      <Toaster />
       <Router>
         <Routes>
           <Route path="/"  element={<HomePage/>} />
           <Route path="/video"  element={<VideoPlayer/>} />
           <Route path="/explore" element={<Gallery/>}/>
           <Route path="/greetings" element={<Greetings/>} />
           <Route path="/postGreetings" element={<PostGreetings/>}/>
         </Routes>
       </Router>
      </div>
    </>
  );
}

export default App;
