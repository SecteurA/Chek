import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, FileCheck, FileOutput, ChevronDown, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActivePath = (path: string) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${
        isActivePath(to)
          ? 'bg-primary/10 text-primary'
          : 'text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActivePath(to) ? 'text-primary' : 'text-gray-500'}`} />
      <span className="ml-3 font-medium">{children}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 z-30 w-full bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
              >
                {isSidebarOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
              <Link to="/" className="flex items-center">
                <svg className="h-8 w-auto" viewBox="0 0 1538 299" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M62.9 282.8h142.9c25.8 0 46.9-21.1 46.9-46.9v-64.8c0-6.2-5-11.2-11.2-11.2-6.1 0-11.1 5-11.1 11.2v64.8c0 13.5-11.1 24.5-24.6 24.5h-142.9c-13.6 0-24.6-11-24.6-24.5v-143c0-13.5 11-24.5 24.6-24.5h103.8c6.2 0 11.2-5 11.2-11.2 0-6.2-5-11.2-11.2-11.2h-103.8c-25.9 0-46.9 21.1-46.9 46.9v143c0 25.8 21 46.9 46.9 46.9z" fill="#0376C3"/>
                  <path d="M113.3 129.7c-8.1-9.3-22.2-10.3-31.5-2.3-9.4 8.1-10.4 22.2-2.3 31.5l44.3 51.4c4.3 4.9 10.5 7.7 16.9 7.7 6.5 0 12.7-2.8 16.9-7.7l133.2-154.1c8.1-9.4 7-23.5-2.3-31.5-9.3-8.1-23.4-7.1-31.5 2.3l-116.3 134.5z" fill="#8ECE34"/>
                  <path d="M393.4 92.8q-30.2 0-47.5 21.4-17.3 21.4-17.3 59 0 39.4 16.6 59.6 16.7 20.2 48.2 20.2 13.6 0 26.4-2.6 12.7-2.8 26.5-7v30q-25.2 9.5-57.2 9.5-47 0-72.2-28.4-25.2-28.6-25.2-81.6 0-33.4 12.2-58.4 12.3-25.1 35.4-38.4 23.2-13.3 54.4-13.3 32.8 0 60.6 13.7l-12.6 29.2q-10.8-5.1-23-9-12-3.9-25.3-3.9zm237.9 81.6v105.6h-34.6v-99.6q0-18.8-7.6-28-7.5-9.2-23.9-9.2-21.7 0-31.9 13-10.1 12.9-10.1 43.4v80.4h-34.5v-227.9h34.5v57.8q0 13.9-1.8 29.8h2.2q7-11.8 19.5-18.2 12.6-6.4 29.3-6.4 58.9 0 58.9 59.3zm118.6 108.5q-37.8 0-59.2-21.9-21.2-22.2-21.2-60.8 0-39.7 19.8-62.4 19.8-22.7 54.3-22.7 32.1 0 50.7 19.4 18.6 19.5 18.6 53.7v18.6h-107.9q0.7 23.5 12.7 36.3 12 12.6 33.8 12.6 14.4 0 26.7-2.7 12.5-2.7 26.7-9v27.9q-12.6 6-25.5 8.5-12.9 2.5-29.5 2.5zm-6.3-141.8q-16.4 0-26.3 10.4-9.9 10.4-11.8 30.4h73.6q-0.3-20.1-9.7-30.4-9.4-10.4-25.8-10.4zm140.8 53.4h0.9l19.5-24.4 48.9-52.1h39.7l-65.2 69.6 69.3 92.4h-40.4l-52-71-18.9 15.5v55.5h-34.2v-227.9h34.2v111.2zm134 67.2q0-10.7 5.6-16.4 5.5-5.7 16.1-5.7 10.7 0 16.2 6 5.6 5.8 5.6 16.1 0 10.4-5.7 16.5-5.6 6-16.1 6-10.6 0-16.1-6-5.6-6-5.6-16.5zm224.1-67.5v85.8h-34.6v-99.9q0-18.6-7-27.7-7-9.2-22-9.2-19.9 0-29.3 13-9.2 12.9-9.2 43.1v80.7h-34.4v-162h26.9l4.9 21.2h1.7q6.8-11.5 19.5-17.8 12.9-6.3 28.3-6.3 37.3 0 49.5 25.4h2.3q7.2-12 20.3-18.7 13-6.7 29.8-6.7 29 0 42.2 14.6 13.4 14.7 13.4 44.7v105.6h-34.5v-99.9q0-18.6-7.1-27.7-7.1-9.2-22-9.2-20.1 0-29.5 12.6-9.2 12.4-9.2 38.4zm276.3 85.8h-24.6l-6.9-22.6h-1.2q-11.7 14.8-23.6 20.3-11.8 5.2-30.4 5.2-23.9 0-37.4-12.9-13.3-12.9-13.3-36.4 0-25.1 18.6-37.8 18.6-12.8 56.7-13.9l28-0.9v-8.7q0-15.5-7.4-23.1-7.2-7.8-22.4-7.8-12.4 0-23.9 3.7-11.4 3.6-21.9 8.6l-11.2-24.6q13.2-6.9 28.9-10.4 15.7-3.6 29.6-3.6 30.9 0 46.6 13.4 15.8 13.5 15.8 42.4zm-75.9-23.5q18.8 0 30-10.4 11.5-10.5 11.5-29.4v-14.1l-20.8 0.9q-24.4 0.9-35.5 8.2-11 7.2-11 22.1 0 10.9 6.5 16.9 6.4 5.8 19.3 5.8z" fill="#0376C3"/>
                </svg>
              </Link>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <User className="h-8 w-8 rounded-full p-1 border border-gray-200" />
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profil
                  </a>
                  <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Déconnexion
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <aside className={`fixed top-16 left-0 z-20 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <nav className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <NavLink to="/" icon={LayoutDashboard}>Tableau de bord</NavLink>
            <NavLink to="/received-checks" icon={FileCheck}>Chèques Reçus</NavLink>
            <NavLink to="/issued-checks" icon={FileOutput}>Chèques Émis</NavLink>
            <NavLink to="/received-lcrs" icon={FileCheck}>LCRs Reçus</NavLink>
            <NavLink to="/issued-lcrs" icon={FileOutput}>LCRs Émis</NavLink>
          </div>
        </nav>
      </aside>

      <main className="pt-16 md:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}