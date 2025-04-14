import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-indigo-800 mb-8">Welcome to Student Management System</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Link 
          to="/register" 
          className="bg-indigo-800 text-white px-8 py-4 rounded-lg shadow-md hover:bg-indigo-900 transition-colors text-center"
        >
          Student Registration
        </Link>
        
        <Link 
          to="/dashboard" 
          className="bg-indigo-800 text-white px-8 py-4 rounded-lg shadow-md hover:bg-indigo-900 transition-colors text-center"
        >
          Student Dashboard
        </Link>
      </div>
    </div>
  );
}
