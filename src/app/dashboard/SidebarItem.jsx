//import { Redacted_Script } from "next/font/google";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  LifeBuoy,
  NotebookPen,
  LibraryBig,
  LayoutDashboard,
  Settings,
  Tags,
  Waypoints,
} from "lucide-react";

export default function App({ children }) {
  return (
    <main className="App">
      {/* {children} */}
      <Sidebar>
        <SidebarItem>
          icon = {<LayoutDashboard size={20} />}
          text="Dashboard" alert
        </SidebarItem>
        <SidebarItem
          icon={<NotebookPen size={20} />}
          text="Dashboard"
          href="/dashboard"
        />
        <SidebarItem
          icon={<LibraryBig size={20} />}
          href="/dashboard/recommandation"
          text="Recommend"
        />
        <SidebarItem
          icon={<Tags size={20} />}
          text="My Notes"
          href="/notebooks"
        />
        <SidebarItem
          icon={<Waypoints size={20} />}
          text="My Books"
          href="/dashboard/recommandation/mybooks"
        />
        <SidebarItem
          icon={<Waypoints size={20} />}
          text="Like books"
          href="/dashboard/recommandation/likebook"
        />
        {/*<SidebarItem icon = {<Receipt size={20}/>} text="Billings"  />*/}
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          href="settings"
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          href="/dashboard/help"
        />
      </Sidebar>
    </main>
  );
}
