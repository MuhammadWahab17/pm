import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Management System",
  description: "Manage projects, milestones, and weekly progress tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
