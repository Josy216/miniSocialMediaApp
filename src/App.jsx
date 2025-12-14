import { Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/register/Login';
import Header from './components/header/Header';
import CreatePost from './components/addmenu/Admenu';
import PostsFeed from './components/menu/Menu';
import MyMemes from './components/admin/Admin';
import Upload from './upload/Upload';
import Getupload from './upload/Getupload';
import EditPost from './components/addmenu/Editmenu';
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostsFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/my-memes" element={<MyMemes />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/getupload" element={<Getupload />} />
      </Routes>
    </div>
  );
}

export default App
