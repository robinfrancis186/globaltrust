import React from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const submenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setIsSubmenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyClick = () => {
    if (location.pathname !== '/') {
      navigate('/?scroll=pre-registration');
    } else {
      const element = document.getElementById('pre-registration');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About the Challenge',
      href: '#',
      submenu: [
        { name: 'Challenge Details', href: '/guidelines' },
        { name: 'People', href: '/people' },
        { name: 'Partners & Sponsors', href: '/partners' },
        { name: 'FAQ', href: '/faq' }
      ],
    },
    { name: 'Events & News', href: '/events' },
    { name: 'Resources', href: '/downloads' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://globalchallenge.ai/wp-content/uploads/2023/11/challengelogo.png"
                alt="Global Trust Challenge"
                className="h-8 w-auto"
                style={{ 
                  objectFit: 'contain',
                  height: '3.6rem'
                }}
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative" ref={item.submenu ? submenuRef : null}>
                {item.submenu ? (
                  <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className={`flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors duration-200`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-indigo-600'
                    } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && isSubmenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {item.submenu.map((subItem) => (
                        <Link
                          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                          key={subItem.name}
                          to={subItem.href}
                          className={`${
                            location.pathname === subItem.href
                              ? 'bg-gray-100 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                          } block px-4 py-2 text-sm transition-colors duration-200`}
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleApplyClick}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Apply Now
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={handleApplyClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 text-sm"
            >
              Apply
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <React.Fragment key={item.name}>
                {item.submenu ? (
                  <>
                    <div className="px-3 py-2 text-base font-medium text-gray-700">
                      {item.name}
                    </div>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`${
                          location.pathname === subItem.href
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
                        } block px-3 py-2 rounded-md text-base font-medium pl-6`}
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}