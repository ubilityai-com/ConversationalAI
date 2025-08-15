
import { ChevronDown, Download, Edit, Home, Import, LogOut, Moon, Play, Save, Settings, Square, Sun, Trash, Upload } from "lucide-react"

import { memo, useState } from "react"
import { handleFlowZoneCheckIfAllHandlesAreConnected } from "../lib/utils"
import { useFlowStore } from "../store/flow-store"
import { useRightDrawerStore } from "../store/right-drawer-store"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
import { Switch } from "./ui/switch"

export default memo(function Header() {
  const [projectName, setProjectName] = useState("Project 1")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const theme = useFlowStore(state => state.theme)
  const setDialogProps = useFlowStore(state => state.setDialogProps)
  const setIsFormDialogOpen = useFlowStore(state => state.setIsFormDialogOpen)
  const setFormDialogStatus = useFlowStore(state => state.setFormDialogStatus)
  const handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement = useRightDrawerStore(state => state.handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement)
  const checkIfWebUrlIsEmpty = useFlowStore(state => state.checkIfWebUrlIsEmpty)

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
  const handlePublish = () => {
    const isAllNodesValid = handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement()
    const isAllHandlesConnected = handleFlowZoneCheckIfAllHandlesAreConnected()
    const isWebUrlEmpty = checkIfWebUrlIsEmpty()
    const flowObject = {}

    console.log({ isAllNodesValid, isAllHandlesConnected, isWebUrlEmpty, flowObject });
    const warnings = []
    if (!isAllNodesValid) {
      warnings.push({
        id: "missing-name",
        title: "Missing Configuration data",
        description: "Please fill all the fields in all Components.",
        severity: "high",
      })
    }
    if (!isAllHandlesConnected) {
      warnings.push({
        id: "missing-handler",
        title: "Missing Connections",
        description:
          "Please connect all the components together.",
        severity: "high",
      })
    }
    if (!isWebUrlEmpty) {
      warnings.push({
        id: "missing-connections",
        title: "Missing Bot Configuration",
        description: "Missing Bot Configuration",
        severity: "high",
      }
      )
    }

    if (warnings.length > 0) {
      setDialogProps({ warnings })
      setFormDialogStatus("validation")
    } else setFormDialogStatus("publish")
    setIsFormDialogOpen(true)

  }
  const handleChangeName = () => {
    setFormDialogStatus("changeName")
    setIsFormDialogOpen(true)
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
                <DropdownMenuItem onSelect={handleChangeName}>
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
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => { }}>
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>

        <Button variant="outline" size="sm" onClick={() => { }}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>

        <Button variant="outline" size="sm" onClick={() => { }}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <Button
          variant={false ? "destructive" : "default"}
          size="sm"
        // onClick={handleRun}
        // disabled={nodes.length === 0}
        >
          {false ? (
            <>
              <Square className="w-4 h-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run
            </>
          )}
        </Button>

        {/* User avatar with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => { }}>
              <Settings className="w-4 h-4" />
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
      </div>
      {/* <DialogDemo open={isDialogOpen} setIsOpen={setIsDialogOpen} /> */}
    </header>
  )
})