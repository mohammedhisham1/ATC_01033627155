
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from authentication context in a real app
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-background/90 border-b border-border/40 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            EventMaster
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : ''}`}>Home</Link>
            <Link to="/categories" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/categories') ? 'text-primary' : ''}`}>Categories</Link>
            {isLoggedIn && (
              <Link to="/my-bookings" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/my-bookings') ? 'text-primary' : ''}`}>My Bookings</Link>
            )}
            {isLoggedIn && (
              <Link to="/admin" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/admin') ? 'text-primary' : ''}`}>Admin</Link>
            )}
          </nav>
          
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Logout
                </Button>
                <Button size="sm" asChild>
                  <Link to="/my-bookings">
                    <User className="mr-1 h-4 w-4" />
                    My Account
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link to="/auth">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <button 
              className="p-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container max-w-6xl mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3 pb-4">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/categories') ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              {isLoggedIn && (
                <Link 
                  to="/my-bookings" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/my-bookings') ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              {isLoggedIn && (
                <Link 
                  to="/admin" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/admin') ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </nav>
            
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                  <Button asChild>
                    <Link 
                      to="/my-bookings"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-1 h-4 w-4" />
                      My Account
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/auth">Login</Link>
                  </Button>
                  <Button 
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/auth">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
