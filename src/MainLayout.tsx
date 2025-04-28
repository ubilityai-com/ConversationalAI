import { useState } from "react";
import Header from "./components/header";
import RightSideDrawer from "./components/right-side-drawer";
import FlowZone from "./flow-zone";
import { NavigationMenu, NavigationMenuLink } from "./components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { ChevronRight, FolderKanban, LayoutDashboard, Settings } from "lucide-react";
import SideMenu from "./components/side-bar";

export default function MainLayout({parentThis}:{parentThis:any}) {
    const [s, ss] = useState(false)
    return (<div className='min-h-screen flex flex-col flex-wrap dark' >
        {/* <div className='w-full shadow-lg bg-background h-16 shadow-xl border-b'>hello</div> */}
        <Header />
        
        {/* <SideNav/> */}
        <SideMenu parentThis={parentThis}/>
        <FlowZone {...parentThis} />
        <RightSideDrawer open={parentThis.state.clickedElement ? "open" : "closed"} parentThis={parentThis}/>
    </div>)
}

const items = [
    {
        label: 'Dashboard',
        icon: <LayoutDashboard size={18} className="text-white" />,
        submenu: ['Overview', 'Stats', 'Reports'],
    },
    {
        label: 'Projects',
        icon: <FolderKanban size={18} className="text-white" />,
        submenu: ['All Projects', 'Archived', 'New Project'],
    },
    {
        label: 'Settings',
        icon: <Settings size={18} className="text-white" />,
        submenu: ['Profile', 'Billing', 'Team'],
    },
];

function SideNav() {
    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 z-50">
            <NavigationMenu orientation="vertical">
                <div className="flex flex-col gap-3 bg-gray-900 p-3 rounded-xl shadow-xl">
                    {items.map((item, idx) => (
                        <Popover key={idx}>
                            <PopoverTrigger asChild>
                                <NavigationMenuLink
                                    className="flex items-center justify-between w-48 px-4 py-2 text-white hover:bg-gray-700 rounded transition-all"
                                >
                                    <div className="flex items-center gap-2">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight size={16} />
                                </NavigationMenuLink>
                            </PopoverTrigger>
                            <PopoverContent
                                side="right"
                                align="start"
                                sideOffset={10}
                                className="bg-white text-gray-800 rounded-md shadow-md p-2 space-y-1 w-40"
                            >
                                {item.submenu.map((sub, i) => (
                                    <div
                                        key={i}
                                        className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer transition"
                                    >
                                        {sub}
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
            </NavigationMenu>
        </div>
    );
}