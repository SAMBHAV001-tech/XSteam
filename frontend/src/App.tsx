import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Lazy load heavy page components
const Analyser = lazy(() => import('./pages/Analyser'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function LoadingFallback() {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#0A0F1E] flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-[#00A8FF] animate-spin" />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[#0A0F1E]">
                <Navbar />
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/analyser" element={<Analyser />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

export default App;
