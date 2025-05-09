import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import Home from '../Home/Home';
import PlantDesc from '../PlantDescription/PlantDes';
import CartPage from '../cart/CartPage';
import PageNotFound from '../pages/PageNotFound';
import Wishlist from '../LikePage/Wishlist';
import CheckOutPages from '../checkOutPage/CheckOutPages';
import AboutUs from '../aboutUs/AboutUs';
import ContactPage from '../contactPage/ContactPage';
import AddPlant from '../admin/addPlant/AddPlant';
import UserData from '../userData/UserData';
import AllUsers from '../admin/AllUsers/AllUsers';
import OrderConfirmation from '../checkOutPage/OrderConfirmation';
import Plant from '../admin/Plant/Plant';
import Admin from '../admin/Admin';
import Skeleton from '../../skeleton/Skeleton';
import AdminChartDash from '../admin/AdminDash/AdminChartDash';
import Equipments from '../admin/equipment/Equipments';
import EquipmentDescription from '../admin/equipment/EquipmentDescription';

// Lazy load for better performance
const AllPlants = React.lazy(() => import("../AllPlant/AllPlant"));

export let routingPages = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "navbar/allplant",
                element: (
                    <Suspense fallback={<Skeleton />}>
                        <AllPlants />
                    </Suspense>
                ),
            },
            {
                path:"equipments",
                element: <Equipments/>
            },
            {
                path: "plant-desc",
                element: <PlantDesc />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "wishlist",
                element: <Wishlist />,
            },
            {
                path: "checkout",
                element: <CheckOutPages />,
            },
            {
                path: "aboutpage",
                element: <AboutUs />,
            },
            {
                path: "contactpage",
                element: <ContactPage />,
            },
            {
                path: "userData",
                element: <UserData />,
            },
            {
                path: "order-comf",
                element: <OrderConfirmation />,
            },
            {
                path:"equipment-desc",
                element: <EquipmentDescription/>
            }
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/admin-dash",
        element: <Admin />,
        children: [
            {
                path: "alluser",
                element: <AllUsers />
            },
            {
                path: "addplant",
                element: <AddPlant />
            },
            {
                path: "allplant",
                element: <Plant />
            },
            {
                path:"admin-chart-dash",
                element: <AdminChartDash/>
            }
        ]
    },
    
    {
        path: "*",
        element: <PageNotFound />,
    },
]);
