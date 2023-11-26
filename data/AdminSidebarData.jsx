import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const AdminsidebarData = [
  {
    heading: "Menu",
    links: [
      {
        label: "Dashboard",
        icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard",
      },
      {
        label: "Sales",
        icon: <MonetizationOnOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/sales",
      },
      {
        label: "Order",
        icon: <DvrOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/order",
      },
      {
        label: "User",
        icon: <AccountCircleOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/user",
      },
      {
        label: "Message",
        icon: <MailOutlineOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/message",
      },
    ],
  },
  {
    heading: "Product",
    links: [
      {
        label: "All Product",
        icon: <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/product/allproduct",
      },
      {
        label: "Create Product",
        icon: <ShoppingBasketOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/product/createproduct",
      },
      {
        label: "Requested Product",
        icon: <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/requestedproduct",
      },
    ],
  },
  {
    heading: "Store",
    links: [
      {
        label: "Store",
        icon: <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/store",
      },
    ],
  },
  {
    heading: "Categories / Subs",
    links: [
      {
        label: "Categories",
        icon: <CategoryOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/categories",
      },
      {
        label: "Subcategories",
        icon: <CategoryOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/subcategories",
      },
    ],
  },
  {
    heading: "Coupons",
    links: [
      {
        label: "Coupons",
        icon: <LocalAtmOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/coupon",
      },
    ],
  },
  {
    heading: "Settings",
    links: [
      {
        label: "Coupons",
        icon: <LocalAtmOutlinedIcon sx={{ fontSize: 18 }} />,
        link: "/admin/dashboard/coupon",
      },
    ],
  },
];

export default AdminsidebarData;
