
import { ChevronDown, Edit, Home, Import, LogOut, Moon, Settings, Sun, Trash, User } from "lucide-react"
import { memo, useState } from "react"
import { useFlowStore } from "../store/flow-store"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
import { Switch } from "./ui/switch"

export default memo(function Header() {
  const [projectName, setProjectName] = useState("Project 1")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const theme = useFlowStore(state => state.theme)
  const toggleTheme = useFlowStore(state => state.toggleTheme)

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...")
  }
  const toggleDarkMode = () => {
    const newTheme = !theme
    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", newTheme.toString())
    toggleTheme()
  }

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-background border-b border-border relative">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img data-light={!theme} src="./ubility-logo.png" alt="Logo" className="h-11 block data-[light=false]:hidden" />
        <img data-dark={theme} src="./ubility-logo-dark.png" alt="Logo" className="h-11 hidden data-[dark=true]:block" />
      </div>

      {/* Breadcrumb in the middle */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-2 items-center text-base">
          <NavigationMenuItem>
            <NavigationMenuLink
              className="flex items-center text-muted-foreground hover:text-primary transition-colors py-1"
              href="/dashboard"
            >
              <Home size={18} className="mr-1.5" />
              <span>Projects</span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <span className="text-muted-foreground mx-1">/</span>

          {/* Project name with dropdown */}
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="flex items-center text-primary font-medium gap-1 p-0 h-auto text-base"
                >
                  {projectName}
                  <ChevronDown size={18} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Change Name</span>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={() => console.log("Import")}>
                  <Import className="mr-2 h-4 w-4" />
                  <span>Import</span>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={() => console.log("Settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onSelect={() => console.log("Delete project")}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* User avatar with dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full p-0 w-10 h-10 hover:bg-muted transition-colors">
            <Avatar className="h-10 w-10 border-2 border-border">
              <AvatarFallback>
                <User size={20} className="text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <div className="flex items-center justify-between cursor-default" onClick={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2">
                {theme ? <Moon size={16} className="text-foreground" /> : <Sun size={16} className="text-foreground" />}
                <span>{theme ? "Dark Mode" : "Light Mode"}</span>
              </div>
              <Switch checked={theme} onCheckedChange={toggleDarkMode} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDemo open={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </header>
  )
})
const DialogDemo = ({ open, setIsOpen }: { open: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <Dialog open={open} onOpenChange={(open) => { setIsOpen(open) }}>

    <DialogPortal>
      <DialogOverlay className="DialogOverlay" />
      <DialogContent className="DialogContent">
        <DialogTitle className="DialogTitle">Edit profile</DialogTitle>
        <DialogDescription className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <Label
          htmlFor="name"
        >
          Name
        </Label>
        <Input
          id="name"
          defaultValue="Pedro Duarte"
        />
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <DialogClose asChild>
            <Button className="Button green">Save changes</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </Dialog>
);
