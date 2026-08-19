import Link from "next/link";
import { useRouter } from "next/router";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Image,
  Calendar, 
  Users, 
  LogOut 
} from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: router.pathname === "/admin/dashboard",
    },
    {
      name: "Submissions",
      icon: MessageSquare,
      href: "/admin/submissions",
      active: router.pathname === "/admin/submissions",
    },
    {
      name: "Gallery",
      icon: Image,
      href: "/admin/gallery",
      active: router.pathname === "/admin/gallery",
    },
    {
      name: "Programs / Events",
      icon: Calendar,
      href: "#",
      disabled: true, // For future use
      active: false,
    },
    {
      name: "Team Members",
      icon: Users,
      href: "#",
      disabled: true, // For future use
      active: false,
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col fixed inset-y-0 left-0 z-50">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="size-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <div>
          <div className="font-bold text-sm">ProActif Global</div>
          <div className="text-[10px] text-gray-400">Admin Portal</div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return item.disabled ? (
            <div
              key={item.name}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 cursor-not-allowed opacity-60"
              title="Coming Soon in future updates"
            >
              <Icon className="size-5" />
              {item.name}
              <span className="ml-auto text-[10px] uppercase bg-gray-800 px-2 py-0.5 rounded">Soon</span>
            </div>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active 
                  ? "bg-red-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="size-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors w-full"
        >
          <LogOut className="size-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
