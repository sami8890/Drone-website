import Dashboard from "@/components/ui/UserDashboard";

export default function DashboardPage() {
  const mockUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Admin",
    avatar: "/avatar.jpg",
  };

  return (
    <div className="min-h-screen">
      <Dashboard userData={mockUserData} />
    </div>
  );
}
