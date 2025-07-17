import { Bot, Grip, Filter, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-secondary border-r border-border p-6 hidden md:block">
      <div className="flex items-center gap-2 mb-8">
        <Bot className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-bold">AI Sync</h1>
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 text-muted-foreground hover:text-foreground ${isActive ? 'text-foreground' : ''}`}>
          <Grip className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-2 text-muted-foreground hover:text-foreground ${isActive ? 'text-foreground' : ''}`}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
