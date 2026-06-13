import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-moss rounded-lg flex items-center justify-center font-bold text-white text-xl">A1</div>
            <span className="font-display font-black text-xl tracking-tighter uppercase text-white">Anleggsgartner 1</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo('tjenester')} className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-moss transition-colors">Tjenester</button>
            <button onClick={() => scrollTo('prosjekter')} className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-moss transition-colors">Prosjekter</button>
            <button onClick={() => scrollTo('prosess')} className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-moss transition-colors">Prosess</button>
            <button onClick={() => scrollTo('kontakt')} className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-moss transition-colors">Kontakt</button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="outline" className="gap-2 rounded-full border-white/20 text-[10px] font-bold uppercase tracking-widest bg-transparent hover:bg-white/10 text-white">
                    <UserIcon className="w-3 h-3" />
                    {user.role === 'admin' ? 'Admin' : 'Min Side'}
                  </Button>
                </Link>
                <Button onClick={() => { logout(); navigate('/'); }} variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-transparent">Logg ut</Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="rounded-full bg-moss text-white text-[10px] font-bold uppercase tracking-widest hover:bg-moss-hover px-5">Logg inn / Book</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
          <button onClick={() => scrollTo('tjenester')} className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-moss">Tjenester</button>
          <button onClick={() => scrollTo('prosjekter')} className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-moss">Prosjekter</button>
          <button onClick={() => scrollTo('prosess')} className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-moss">Prosess</button>
          <button onClick={() => scrollTo('kontakt')} className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-moss">Kontakt</button>
          
          <div className="pt-4 border-t border-gray-100 mt-4">
            {user ? (
               <div className="flex flex-col space-y-2 px-3">
                 <Link to="/dashboard">
                   <Button variant="outline" className="w-full justify-center">Min Side</Button>
                 </Link>
                 <Button onClick={() => { logout(); navigate('/'); }} variant="ghost" className="w-full justify-center">Logg ut</Button>
               </div>
            ) : (
               <Link to="/login" className="px-3" onClick={() => setIsOpen(false)}>
                 <Button className="w-full bg-moss hover:bg-moss-hover text-white">Logg inn / Book</Button>
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
