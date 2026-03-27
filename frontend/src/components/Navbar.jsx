import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/[0.06]" style={{
            backgroundColor: 'rgba(10, 15, 30, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
        }}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <Logo size="md" />
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-all ${isActive('/')
                                    ? 'text-white border-b-2 border-[#00A8FF] pb-1'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/analyser"
                            className={`text-sm font-medium transition-all ${isActive('/analyser')
                                    ? 'text-white border-b-2 border-[#00A8FF] pb-1'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Analyser
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`text-sm font-medium transition-all ${isActive('/dashboard')
                                    ? 'text-white border-b-2 border-[#00A8FF] pb-1'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
