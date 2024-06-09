import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export const cardData = [
  {
    id: 1,
    title: "Revenue",
    count: "$13,456.5",
    description: "Shipping fees are not included",
    icon: <AttachMoneyIcon sx={{ color: "#088178" }} />,
    backgroundColor: "#CEE6E4",
    color: "#1B8178",
  },
  {
    id: 2,
    title: "Orders",
    count: "53.668",
    description: "Excluding orders in transit",
    icon: <LocalShippingIcon />,
    backgroundColor: "#CCF0D1",
    color: "#00B517",
  },
  {
    id: 3,
    title: "Products",
    count: "9.856",
    description: "In 19 Categories",
    icon: <QrCodeIcon />,
    backgroundColor: "#FFE8D0",
    color: "#FD8E1C",
  },
  {
    id: 4,
    title: "Monthly Earning",
    count: "$6,982",
    description: "Based in your local time.",
    icon: <ShoppingBasketIcon />,
    backgroundColor: "#CFF4E8",
    color: "#0DCAF0",
  },
];

export const revenueChartData = [
  {
    name: "900",
    design: 433,
    development: 208,
    deployment: 408,
    maintenace: 123,
  },
  {
    name: "1200",
    design: 321,
    development: 447,
    deployment: 547,
    maintenace: 345,
  },
  {
    name: "1400",
    design: 783,
    development: 675,
    deployment: 575,
    maintenace: 122,
  },
  {
    name: "1600",
    design: 800,
    development: 734,
    deployment: 634,
    maintenace: 302,
  },
];

export const projectsData = [
  {
    id: 1,
    title: "Project 1",
    totalTask: 232,
    totalCompletedTask: 231,
    totalPendingTask: 1,
    UpPercentage: "99%"
  },
  {
    id: 2,
    title: "Project 2",
    totalTask: 232,
    totalCompletedTask: 231,
    totalPendingTask: 1,
    UpPercentage: "99%"
  },
  {
    id: 3,
    title: "Project 3",
    totalTask: 232,
    totalCompletedTask: 231,
    totalPendingTask: 1,
    UpPercentage: "99%"
  },
  {
    id: 4,
    title: "Project 4",
    totalTask: 232,
    totalCompletedTask: 230,
    totalPendingTask: 0,
    UpPercentage: "100%"
  },
];

// Keys
export const revenueChartKeys = [
  {
    name: "design",
    color: "#5897FB",
  },
  {
    name: "development",
    color: "#5897FB",
  },
  {
    name: "deployment",
    color: "#FF9076",
  },
  {
    name: "maintenance",
    color: "#D85DF7",
  },
];

export const saleChartKeys = [
  {
    id: "colorSales",
    name: "project1",
    color: "#8884d8",
    dot: "#4e45ff",
  },
  {
    id: "colorVisitors",
    name: "project2",
    color: "#82ca9d",
    dot: "#22e46b",
  },
  {
    id: "colorProject",
    name: "project3",
    color: "#FFC8E6",
    dot: "#ff2ea0",
  },
];

// NewsUpdate
export const todaysTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Task 1 Details",
    priority: "High",
    },
  {
    id: 2,
    title: "Task 2",
    description: "Task 2 Details",
    priority: "Low",
    },
  {
    id: 3,
    title: "Task 3",
    description: "Task 3 Details",
    priority: "Medium",
    },
  {
    id: 4,
    title: "Task 4",
    description: "Task 4 Details",
    priority: "High",
    },
];

export const messageData = [
  {
    id: 1,
    time: "11:11 AM",
    title: "Message 1",
  },
  {
    id: 2,
    title: "Message 2",
    time: "12:12 PM",
  },
  {
    id: 3,
    title: "Message 3",
    time: "8:28 AM",
  },
  {
    id: 4,
    title: "Message 4",
    time: "10:49 AM",
  },
];
