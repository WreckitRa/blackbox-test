import {
  FiToggleLeft,
  FiList,
  FiActivity,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiHelpCircle,
  FiShoppingCart,
  FiHome,
  FiUsers,
} from "react-icons/fi";

const initialState = [
  {
    title: <p className="font-bold">Libaries</p>,
    items: [
      {
        url: "/personal",
        icon: <FiUser size={20} />,
        title: "Personal",
        items: [],
      },
      {
        url: "/404",
        icon: <FiStar size={20} />,
        title: "Featured",
        items: [],
      },
      {
        url: "/404",
        icon: <FiUsers size={20} />,
        title: "Team",
        items: [],
      },
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
