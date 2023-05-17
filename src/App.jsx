import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import Customer from "./pages/Customer";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="enquiries" element={<Enquiries />} />
                    <Route path="blog-list" element={<Bloglist />} />
                    <Route path="blog" element={<AddBlog />} />
                    <Route
                        path="blog-category-list"
                        element={<BlogCatList />}
                    />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customer />} />
                    <Route path="list-color" element={<ColorList />} />
                    <Route path="list-category" element={<CategoryList />} />
                    <Route path="list-brand" element={<BrandList />} />
                    <Route path="list-product" element={<ProductList />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;