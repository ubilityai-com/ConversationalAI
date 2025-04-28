import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown, Edit, Home, Import, LogOut, Moon, Settings, Sun, Trash, User } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Button } from './ui/button';

export default function Header() {
  const [projectName, setProjectName] = React.useState("Project 1");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  const darkMode = false
  const toggleDarkMode = () => {
    // setDarkMode(!darkMode);
    // Here you would add actual dark mode implementation
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...");
  };
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-background border-b border-gray-200 relative">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src={`./ubility-logo.png`} alt="Logo" className="h-11 block" />
        {/* <img src={`./ubility-logo-dark.png`} alt="Logo" className="h-11 hidden dark:block" /> */}

      </div>

      {/* Breadcrumb in the middle */}
      <NavigationMenu.Root className="flex items-center">
        <NavigationMenu.List className="flex gap-2 items-center">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="flex items-center text-gray-400 hover:text-blue-600 transition-colors"
              href="/dashboard"
            >
              <Home size={16} className="mr-1" />
              <span>Projects</span>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <span className="text-gray-400">/</span>

          {/* Project name with dropdown */}
          <NavigationMenu.Item>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center text-blue-600 font-medium hover:underline gap-1 outline-none">
                  {projectName}
                  <ChevronDown size={16} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="bg-background rounded-md shadow-lg p-2 min-w-48 border border-muted"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded cursor-pointer outline-none">
                    <Edit size={16} />
                    Change Name
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded cursor-pointer outline-none">
                    <Import size={16} />
                    Import
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded cursor-pointer outline-none">
                    <Settings size={16} />
                    Settings
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-px bg-gray-800 my-1" />

                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none">
                    <Trash size={16} />
                    Delete Project
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>

      {/* User avatar with dropdown */}
      <div className="relative" ref={userDropdownRef}>
        <button
          className="flex items-center gap-3 pl-4 pr-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setUserDropdownOpen(!userDropdownOpen)}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-200 shadow-sm">
              {/* You can replace this with an actual image */}
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        </button>

        {/* User dropdown menu */}
        {userDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-background rounded-lg shadow-lg p-1.5 min-w-max border border-gray-200 z-10 w-48">
            <div className="p-3 mb-1 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@example.com</p>
            </div>

            {/* Toggle Switch Layout */}
            <button
              className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-muted rounded-md cursor-pointer outline-none w-full text-left"
              onClick={toggleDarkMode}
            >
              <div className="flex items-center gap-2">
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
              </div>
              <div className="relative w-9 h-5 rounded-full bg-background">
                <div className={`absolute w-4 h-4 rounded-full bg-background top-0.5 shadow transition-transform ${darkMode ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
              </div>
            </button>

            <div className="h-px bg-background my-1.5"></div>

            <button
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none w-full text-left"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        )}
      </div>
      <Button variant={"default"} className='absolute bottom-[-50px] right-5 z-50'>Publish</Button>
    </header>
  );
}