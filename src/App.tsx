import { Routes, Route, Link, useLocation } from 'react-router-dom';
import StaffRegistration from './components/StaffRegistration';
import StaffDataManagement from './components/StaffDataManagement';
import Home from './components/Home';


function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="p-4 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-800">Maritime Staff Registration Portal</h1>
          <nav className="flex gap-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded transition-colors ${
                location.pathname === '/' 
                  ? 'bg-indigo-900 text-white' 
                  : 'bg-indigo-800 text-white hover:bg-indigo-900'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/register" 
              className={`px-4 py-2 rounded transition-colors ${
                location.pathname === '/register' 
                  ? 'bg-indigo-900 text-white' 
                  : 'bg-indigo-800 text-white hover:bg-indigo-900'
              }`}
            >
              Registration
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-4 py-2 rounded transition-colors ${
                location.pathname === '/dashboard' 
                  ? 'bg-indigo-900 text-white' 
                  : 'bg-indigo-800 text-white hover:bg-indigo-900'
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<StaffRegistration />} />
          <Route path="/dashboard" element={<StaffDataManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
