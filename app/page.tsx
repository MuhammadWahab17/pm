import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Project Management System
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link 
              href="/projects" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Projects
              </h2>
              <p className="text-gray-600">
                View and manage all your projects
              </p>
            </Link>

            <Link 
              href="/reminders" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Email Reminders
              </h2>
              <p className="text-gray-600">
                Schedule and manage email reminders
              </p>
            </Link>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Quick Start
            </h3>
            <p className="text-blue-800 text-sm">
              1. Create a new project with a major goal<br />
              2. Add milestones to your project<br />
              3. Set a current milestone and track weekly progress<br />
              4. Schedule email reminders for important follow-ups
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
