import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import PostsLists from "./components/PostList";
import MotionTest from "./motiontesting/MotionTest";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/posts" element={<PostsLists />} />
          <Route path="/motion" element={<MotionTest />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
