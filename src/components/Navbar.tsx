import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as ResizableNavbar, NavBody, MobileNav, MobileNavToggle, MobileNavMenu } from '@/components/ui/resizable-navbar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const submenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setIsSubmenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const smoothScrollTo = (targetElement: HTMLElement, duration: number = 600) => {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleApplyClick = () => {
    if (location.pathname !== '/') {
      navigate('/?scroll=pre-registration');
    } else {
      const element = document.getElementById('pre-registration');
      if (element) {
        smoothScrollTo(element, 600);
      }
    }
    setIsOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About the Challenge',
      href: '#',
      submenu: [
        { name: 'People', href: '/people' },
        { name: 'Partners & Sponsors', href: '/partners' },
        { name: 'FAQ', href: '/faq' }
      ],
    },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <div className="relative w-full">
      <ResizableNavbar className="top-4">
        <NavBody className="justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <img
                  src="https://maximages.s3.us-west-1.amazonaws.com/challengelogo.png"
                  alt="Global Trust Challenge"
                  className="h-8 w-auto relative z-10"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative" ref={item.submenu ? submenuRef : null}>
                {item.submenu ? (
                  <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className={`flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200`}
                  >
                    {item.name}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`${location.pathname === item.href
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                      } px-4 py-2 text-sm font-medium transition-colors duration-200 relative group`}
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && isSubmenuOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white border border-slate-100 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {item.submenu.map((subItem) => (
                        <Link
                          onClick={() => setIsSubmenuOpen(false)}
                          key={subItem.name}
                          to={subItem.href}
                          className={`${location.pathname === subItem.href
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                            } block px-4 py-3 text-sm transition-colors duration-200`}
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
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={handleApplyClick}
              className="relative px-5 py-2 rounded-full font-semibold text-white text-sm overflow-hidden group shadow-md hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-105"></div>
              <span className="relative z-10">Register Now</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            {navigation.map((item) => (
              <React.Fragment key={item.name}>
                {item.submenu ? (
                  <>
                    <div className="px-3 py-2 text-base font-medium text-blue-600 border-b border-slate-100 mb-2 mt-2">
                      {item.name}
                    </div>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 pl-6"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
            <button
              onClick={handleApplyClick}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Register Now
            </button>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}