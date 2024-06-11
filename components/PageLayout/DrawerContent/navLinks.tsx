import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
const MenuData = [
  {
    title: "Chat",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    link: "/chat",
  },
  {
    title: "Attendance",
    icon: <CalendarTodayOutlinedIcon />,
    link: "/attendance",
  },
  {
    title: "Leaves",
    icon: <CalendarTodayOutlinedIcon />,
    link: "/leaves",
  },
  {
    title: "Leave Approval",
    icon: <CalendarTodayOutlinedIcon />,
    link: "/leaveApproval",
  },
  // {
  //   title: "Meet In",
  //   icon: <GroupsOutlinedIcon />,
  //   link: "/meetin",
  // },
  {
    title: "Project",
    icon: <AssignmentOutlinedIcon />,
    link: "/projects",
  },
  {
    title: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    link: "/profile",
  },
];

export default MenuData;
