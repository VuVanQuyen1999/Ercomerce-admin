import React from "react";
import { Outlet } from "react-router-dom";
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
    AiOutlinePicLeft,
    AiOutlinePicRight,
} from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { ImBlog } from "react-icons/im";
import { BsCartPlus } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../images/avatar.jpg";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical d-flex justify-content-center">
                        <h2 className="text-white fs-5 text-center py-3 my-auto">
                            <span className="sm-logo">DQ</span>
                            <span className="lg-logo">Dev Quyen</span>
                        </h2>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[""]}
                        onClick={({ key }) => {
                            if (key === "signout") {
                            } else {
                                navigate(key);
                            }
                        }}
                        items={[
                            {
                                key: "",
                                icon: <AiOutlineDashboard className="fs-4" />,
                                label: "Dashboard",
                            },
                            {
                                key: "customers",
                                icon: <AiOutlineUser className="fs-4" />,
                                label: "Customers",
                            },
                            {
                                key: "Catalog",
                                icon: (
                                    <AiOutlineShoppingCart className="fs-4" />
                                ),
                                label: "Catalog",
                                children: [
                                    {
                                        key: "product",
                                        icon: <BsCartPlus className="fs-4" />,
                                        label: "Add Product",
                                    },
                                    {
                                        key: "list-product",
                                        icon: (
                                            <AiOutlineShoppingCart className="fs-4" />
                                        ),
                                        label: "Product List",
                                    },
                                    {
                                        key: "brand",
                                        icon: (
                                            <SiBrandfolder className="fs-4" />
                                        ),
                                        label: "Brand",
                                    },
                                    {
                                        key: "list-brand",
                                        icon: (
                                            <SiBrandfolder className="fs-4" />
                                        ),
                                        label: "Brand List",
                                    },
                                    {
                                        key: "category",
                                        icon: (
                                            <BiCategoryAlt className="fs-4" />
                                        ),
                                        label: "Category",
                                    },
                                    {
                                        key: "list-category",
                                        icon: (
                                            <BiCategoryAlt className="fs-4" />
                                        ),
                                        label: "Category List",
                                    },
                                    {
                                        key: "color",
                                        icon: (
                                            <AiOutlineBgColors className="fs-4" />
                                        ),
                                        label: "Color",
                                    },
                                    {
                                        key: "list-color",
                                        icon: (
                                            <AiOutlineBgColors className="fs-4" />
                                        ),
                                        label: "Color List",
                                    },
                                ],
                            },
                            {
                                key: "orders",
                                icon: <FaClipboardList className="fs-4" />,
                                label: "Orders",
                            },
                            {
                                key: "blogs",
                                icon: <FaBloggerB className="fs-4" />,
                                label: "Blog",
                                children: [
                                    {
                                        key: "blog",
                                        icon: <ImBlog className="fs-4" />,
                                        label: "Add Blog",
                                    },
                                    {
                                        key: "blog-list",
                                        icon: <FaBloggerB className="fs-4" />,
                                        label: "Blog List",
                                    },
                                    {
                                        key: "blog-category",
                                        icon: <ImBlog className="fs-4" />,
                                        label: "Add Blog Category",
                                    },
                                    {
                                        key: "blog-category-list",
                                        icon: <FaBloggerB className="fs-4" />,
                                        label: "Blog Category List",
                                    },
                                ],
                            },
                            {
                                key: "enquiries",
                                icon: <FaClipboardList className="fs-4" />,
                                label: "Enquiries",
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        className="d-flex justify-content-between px-3 pe-5"
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <AiOutlinePicLeft />
                                ) : (
                                    <AiOutlinePicRight />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="d-flex gap-3 align-items-center">
                            <div className="position-relative">
                                <IoIosNotifications className="fs-4" />
                                <span className="badge bg-warning rounded-circle p-1 position-absolute">
                                    3
                                </span>
                            </div>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="avatar-img">
                                    <img
                                        src={avatar}
                                        alt="avatar"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h5 className="text-dark m-0">
                                        Vu Van Quyen
                                    </h5>
                                    <p className="m-0">
                                        vuvanquyen07081999@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default MainLayout;
