import {Search, Bell, Settings, User, Home, Camera, Calendar, CreditCard, LayoutDashboard, LogOut, ChevronDown, Menu, CircleArrowLeft, SearchX, X, ShoppingCart} from "lucide-react";

const icons = {
  search: Search, 
  bell: Bell, 
  settings: Settings, 
  user: User,
  home: Home, 
  camera: Camera, 
  calendar: Calendar,
  payment: CreditCard,
  dashboard: LayoutDashboard,
  logout: LogOut,
  chevrondown: ChevronDown,
  menu: Menu,
  circlearrowleft: CircleArrowLeft,
  searchx: SearchX,
  close: X,
  cart: ShoppingCart
};

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} strokeWidth={strokeWidth} />;
}

export default Icon;