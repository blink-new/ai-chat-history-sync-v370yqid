import { User, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-secondary border-b border-border">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-background rounded-full pl-10 pr-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-background">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
