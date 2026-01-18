import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { getCurrentWeekSunday, getCurrentWeekSaturday } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      milestones: {
        include: {
          weeklyProgress: {
            orderBy: { weekStartDate: "desc" },
            take: 5,
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const currentMilestone = project.milestones.find((m) => m.isCurrent);
  const isSunday = new Date().getDay() === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              href="/projects"
              className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
            >
              ← Back to Projects
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h1>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    project.status === "active"
                      ? "bg-green-100 text-green-800"
                      : project.status === "completed"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <Link
                href={`/projects/${project.id}/milestones/new`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Milestone
              </Link>
            </div>

            {project.description && (
              <p className="text-gray-600 mb-4">{project.description}</p>
            )}

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Major Goal
              </h3>
              <p className="text-gray-900 font-medium">{project.majorGoal}</p>
            </div>
          </div>

          {isSunday && currentMilestone && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                It's Sunday! Time to track weekly progress
              </h3>
              <p className="text-blue-800 text-sm mb-4">
                Record what you completed last week and plan for next week.
              </p>
              <Link
                href={`/weekly-progress/new?milestoneId=${currentMilestone.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Create Weekly Report
              </Link>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Milestones
            </h2>

            {project.milestones.length === 0 ? (
              <p className="text-gray-600">
                No milestones yet. Create one to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`border rounded-lg p-4 ${
                      milestone.isCurrent
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {milestone.title}
                          </h3>
                          {milestone.isCurrent && (
                            <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
                              Current
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              milestone.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : milestone.status === "in-progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {milestone.status}
                          </span>
                        </div>
                        {milestone.description && (
                          <p className="text-gray-600 text-sm mt-2">
                            {milestone.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {milestone.isCurrent && milestone.weeklyProgress.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Recent Weekly Progress:
                        </h4>
                        <div className="space-y-2">
                          {milestone.weeklyProgress.slice(0, 3).map((progress) => (
                            <div
                              key={progress.id}
                              className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                            >
                              <div className="font-medium">
                                Week of {new Date(progress.weekStartDate).toLocaleDateString()}
                              </div>
                              <div className={`mt-1 ${progress.goalsAchieved ? 'text-green-600' : 'text-orange-600'}`}>
                                Goals: {progress.goalsAchieved ? '✓ Achieved' : '✗ Not Achieved'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {currentMilestone && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Weekly Progress History
              </h2>
              <p className="text-gray-600">
                Weekly progress tracking for the current milestone.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
