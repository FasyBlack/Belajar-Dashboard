import { LayoutDashboard, Users, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white h-screen flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="font-bold text-lg tracking-tight">Portofolio Dev</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center gap-3 px-3 py-2 bg-zinc-100 rounded-md text-sm font-medium text-zinc-900">
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-md text-sm font-medium transition-colors">
          <Users className="w-4 h-4" /> Klien / Pengguna
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-md text-sm font-medium transition-colors">
          <Settings className="w-4 h-4" /> Pengaturan Sistem
        </a>
      </nav>
    </aside>
  )
}