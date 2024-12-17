"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  User,
  Settings,
  BarChart,
  Sun,
  Moon,
  Upload,
  Bell,
  HelpCircle,
  Home,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";

// GSAP Plugin Registration
gsap.registerPlugin(ScrollTrigger);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Enhanced TypeScript Interfaces
interface UserData {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  preferences?: {
    theme?: "light" | "dark";
    notifications?: boolean;
  };
}

interface DashboardSection {
  icon: React.ReactNode;
  title: string;
  key: string;
  component: React.ReactNode;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: Date;
}

// Helper functions for local storage
const getLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      if (key === "theme") {
        // Handle theme separately as it's stored as a string
        return stored as T;
      }
      try {
        return JSON.parse(stored);
      } catch {
        // If parsing fails, return the stored value as is
        return stored as T;
      }
    }
  }
  return defaultValue;
};

const setLocalStorage = <T,>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default function ImprovedDashboard({
  userData,
}: {
  userData: UserData;
}) {
  // State Management with Local Storage
  const [activeSection, setActiveSection] = useState<string>(() =>
    getLocalStorage("activeSection", "overview")
  );
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    getLocalStorage("theme", "dark")
  );
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(() =>
    getLocalStorage("isNotificationEnabled", false)
  );
  const [tasks, setTasks] = useState<Task[]>(() =>
    getLocalStorage("tasks", [])
  );
  const [newTask, setNewTask] = useState("");
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() =>
    getLocalStorage("activityLogs", [])
  );

  // Refs and Clerk Hooks
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  // Avatar State Management
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    () => user?.imageUrl || userData?.avatar || "/placeholder-avatar.png"
  );

  // Improved Theme Toggle with Persistent State
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setLocalStorage("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    addActivityLog(`Changed theme to ${newTheme} mode`);
  };

  // Task Management Functions
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
      };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      setLocalStorage("tasks", updatedTasks);
      setNewTask("");
      addActivityLog(`Added new task: ${task.title}`);
    }
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setLocalStorage("tasks", updatedTasks);
    const task = tasks.find((t) => t.id === id);
    addActivityLog(
      `${task?.completed ? "Uncompleted" : "Completed"} task: ${task?.title}`
    );
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setLocalStorage("tasks", updatedTasks);
    addActivityLog(`Deleted task: ${task?.title}`);
  };

  // Activity Log Function
  const addActivityLog = (action: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date(),
    };
    const updatedLogs = [newLog, ...activityLogs.slice(0, 9)];
    setActivityLogs(updatedLogs);
    setLocalStorage("activityLogs", updatedLogs);
  };

  // Avatar Upload Handler with Error Handling and Persistent Storage
  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size and type
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (file.size > maxSize) {
        alert("File is too large. Maximum size is 5MB.");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPEG, PNG, or GIF.");
        return;
      }

      setAvatarFile(file);

      try {
        if (user) {
          // Upload the image to Clerk
          await user.setProfileImage({ file });

          // Get the updated user data
          const updatedUser = await user.reload();

          // Update the avatar URL with the new image URL from Clerk
          const newAvatarUrl = updatedUser.imageUrl;
          setAvatarUrl(newAvatarUrl);

          addActivityLog("Updated profile picture");
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error("Avatar upload failed", error);
        alert("Failed to upload avatar. Please try again.");
      }
    }
  };

  // Enhanced Sections with Dynamic Rendering
  const sections: DashboardSection[] = useMemo(
    () => [
      {
        icon: <Home className="w-6 h-6" />,
        title: "Overview",
        key: "overview",
        component: (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400">
                  1,234
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">Active Projects</h3>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400">
                  56
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">Tasks Completed</h3>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400">
                  789
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Recent Tasks</h3>
                <ul className="space-y-2">
                  {tasks.slice(0, 5).map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg"
                    >
                      <span
                        className={
                          task.completed ? "line-through text-gray-500" : ""
                        }
                      >
                        {task.title}
                      </span>
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300"
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <ul className="space-y-2">
                  {activityLogs.slice(0, 5).map((log) => (
                    <li
                      key={log.id}
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg"
                    >
                      <p>{log.action}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        icon: <User className="w-6 h-6" />,
        title: "Profile",
        key: "profile",
        component: (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 block mb-2">Full Name</label>
                <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {user?.fullName || "Not provided"}
                </p>
              </div>
              <div>
                <label className="text-gray-400 block mb-2">
                  Email Address
                </label>
                <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {user?.primaryEmailAddress?.emailAddress || "Not available"}
                </p>
              </div>
              <div>
                <label className="text-gray-400 block mb-2">Role</label>
                <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {userData.role || "Unassigned"}
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        icon: <Settings className="w-6 h-6" />,
        title: "Settings",
        key: "settings",
        component: (
          <div>
            <h2 className="text-2xl font-semibold mb-4">User Preferences</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-gray-400 text-sm">
                    Customize your dashboard appearance
                  </p>
                </div>
                <div className="flex items-center">
                  {theme === "dark" ? (
                    <Moon className="mr-2" />
                  ) : (
                    <Sun className="mr-2" />
                  )}
                  <button
                    onClick={toggleTheme}
                    className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-gray-400 text-sm">
                    Receive updates and alerts
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNotificationEnabled}
                    onChange={() => {
                      const newState = !isNotificationEnabled;
                      setIsNotificationEnabled(newState);
                      setLocalStorage("isNotificationEnabled", newState);
                      addActivityLog(
                        `${newState ? "Enabled" : "Disabled"} notifications`
                      );
                    }}
                    className="hidden"
                  />
                  <div
                    className={`
                                            w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out
                                            ${
                                              isNotificationEnabled
                                                ? "bg-lime-500"
                                                : "bg-gray-400"
                                            }
                                        `}
                  >
                    <div
                      className={`
                                                bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out
                                                ${
                                                  isNotificationEnabled
                                                    ? "translate-x-7"
                                                    : "translate-x-0"
                                                }
                                            `}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        ),
      },
      {
        icon: <BarChart className="w-6 h-6" />,
        title: "Analytics",
        key: "analytics",
        component: (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Performance Insights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-2 text-lg font-medium">Active Users</h3>
                <Bar
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        label: "Active Users",
                        data: [12, 19, 3, 5, 2, 3, 10],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: { display: true, text: "Daily User Activity" },
                    },
                  }}
                />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Page Views</h3>
                <Line
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [
                      {
                        label: "Page Views",
                        data: [30, 50, 40, 60, 70, 100, 90],
                        fill: false,
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Monthly Page View Trends",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ),
      },
    ],
    [
      user,
      userData,
      theme,
      isNotificationEnabled,
      toggleTheme,
      tasks,
      activityLogs,
    ]
  );

  // Smooth Section Transition with GSAP
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [activeSection]);

  // Theme Application on Mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Save active section to local storage
  useEffect(() => {
    setLocalStorage("activeSection", activeSection);
  }, [activeSection]);

  // Dynamic Greeting with More Precise Time Segments
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 22) return "Good Evening";
    return "Good Night";
  };

  return (
    <main
      className={`${theme} min-h-screen flex bg-white dark:bg-black text-black dark:text-white relative`}
    >
      {/* Sidebar with Enhanced Styling */}
      <aside className="w-64 h-screen p-6 bg-gray-100 dark:bg-gradient-to-br dark:from-[#121212] dark:via-[#1a1a1a] dark:to-[#121212] text-gray-800 dark:text-gray-300 border-r dark:border-none">
        <div className="flex items-center mb-8 gap-4">
          <div className="relative group">
            <Image
              src={avatarUrl}
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-4 border-lime-500 object-cover"
              width={64}
              height={64}
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-lime-500 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Upload className="w-4 h-4 text-white" />
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-lime-600 dark:text-lime-400">
              {user?.firstName || "User"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {userData.role || "User"}
            </p>
          </div>
        </div>

        {/* Navigation with Additional Interactivity */}
        <nav className="space-y-4">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`
                                flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium transition-all duration-300 
                                hover:bg-lime-500/10 group
                                ${
                                  activeSection === section.key
                                    ? "bg-lime-500/20 text-lime-600 dark:text-lime-400"
                                    : "text-gray-600 dark:text-gray-400"
                                }
                            `}
            >
              <span className="group-hover:scale-110 transition-transform">
                {section.icon}
              </span>
              {section.title}
            </button>
          ))}
        </nav>

        {/* Help and Notification Button */}
        <div className="mt-8 flex justify-between">
          <button
            className="text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400"
            title="Help and Support"
          >
            <HelpCircle />
          </button>
          <button
            className={`
                            relative text-gray-600 dark:text-gray-400 
                            hover:text-lime-600 dark:hover:text-lime-400
                            ${isNotificationEnabled ? "animate-pulse" : ""}
                        `}
            title="Notifications"
          >
            <Bell />
            {isNotificationEnabled && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                1
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Content Section with Improved Responsiveness */}
      <section
        ref={contentRef}
        className="flex-1 p-8 bg-white dark:bg-[#1a1a1a] overflow-y-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-lime-600 dark:text-lime-400">
          {getGreeting()}, {user?.firstName || "User"}!
        </h1>

        {/* Render Active Section Dynamically */}
        {sections.find((section) => section.key === activeSection)?.component}

        {/* Task Management Section */}
        {activeSection === "overview" && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Task Management</h2>
            <form
              onSubmit={addTask}
              className="flex flex-col sm:flex-row gap-2 mb-4"
            >
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
              <button
                type="submit"
                className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors"
              >
                <PlusCircle className="w-5 h-5 inline-block mr-2" />
                <span className="sm:hidden">Add Task</span>
              </button>
            </form>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-2"
                >
                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-500 mb-2 sm:mb-0"
                        : "mb-2 sm:mb-0"
                    }
                  >
                    {task.title}
                  </span>
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 mr-2"
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

export { ImprovedDashboard };
