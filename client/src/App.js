import "./App.css";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AddNewBlogPost from "./pages/add-blog-post";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddNewBlogPost />} />
      </Routes>
    </div>
  );
}

export default App;
