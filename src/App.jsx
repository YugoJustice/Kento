import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Stories from "./pages/Stories.jsx";
import DeepDive from "./pages/DeepDive.jsx";
import AppShowcase from "./pages/AppShowcase.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Reserve from "./pages/Reserve.jsx";

const NotFound = () => (
  <section className="section page-hero"><h1>4<span className="grad">0</span>4</h1><p className="sub">That page went silent.</p><Link to="/" className="btn">Back home</Link></section>
);

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="deep-dive" element={<DeepDive />} />
          <Route path="app" element={<AppShowcase />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="stories" element={<Stories />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
