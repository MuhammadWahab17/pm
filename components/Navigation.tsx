import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Project Management
          </Link>
          <div className="flex space-x-6">
            <Link 
              href="/projects" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/reminders" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Reminders
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
