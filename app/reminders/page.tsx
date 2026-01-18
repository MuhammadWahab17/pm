"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Link from "next/link";

interface Reminder {
  id: string;
  subject: string;
  message: string;
  recipientEmail: string;
  reminderDate: string;
  status: string;
  project: {
    id: string;
    name: string;
  };
}

export default function RemindersPage() {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    projectId: "",
    subject: "",
    message: "",
    recipientEmail: "",
    reminderDate: "",
  });
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchReminders();
    fetchProjects();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch("/api/reminders");
      if (response.ok) {
        const data = await response.json();
        setReminders(data);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setFormData({
          projectId: "",
          subject: "",
          message: "",
          recipientEmail: "",
          reminderDate: "",
        });
        fetchReminders();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create reminder");
      }
    } catch (error) {
      console.error("Error creating reminder:", error);
      alert("Error creating reminder");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) {
      return;
    }

    try {
      const response = await fetch(`/api/reminders/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchReminders();
      } else {
        alert("Failed to delete reminder");
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
      alert("Error deleting reminder");
    }
  };

  const scheduledReminders = reminders.filter((r) => r.status === "scheduled");
  const sentReminders = reminders.filter((r) => r.status === "sent");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p className="text-gray-600">Loading reminders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Reminders</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? "Cancel" : "+ New Reminder"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create Email Reminder
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project *
                </label>
                <select
                  required
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData({ ...formData, projectId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reminder subject"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message / Details *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter detailed reminder message (e.g., 'I need to check this with the developer')"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.recipientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientEmail: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.reminderDate}
                  onChange={(e) =>
                    setFormData({ ...formData, reminderDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Schedule Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-8">
          {scheduledReminders.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Scheduled Reminders
              </h2>
              <div className="space-y-4">
                {scheduledReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {reminder.subject}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Project:{" "}
                          <Link
                            href={`/projects/${reminder.project.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {reminder.project.name}
                          </Link>
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          To: {reminder.recipientEmail}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Scheduled: {new Date(reminder.reminderDate).toLocaleString()}
                        </p>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {reminder.message}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sentReminders.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sent Reminders
              </h2>
              <div className="space-y-4">
                {sentReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="bg-gray-50 rounded-lg shadow p-6 opacity-75"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {reminder.subject}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Project: {reminder.project.name}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          To: {reminder.recipientEmail}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Sent: {new Date(reminder.reminderDate).toLocaleString()}
                        </p>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {reminder.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reminders.length === 0 && !showForm && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No reminders yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Create your first reminder →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
