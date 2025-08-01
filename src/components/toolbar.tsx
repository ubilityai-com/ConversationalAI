import { AlignJustify, ChevronDown, Download, Edit, Home, Import, Key, Loader2, MoreHorizontal, MoreHorizontalIcon, Play, Save, Settings, Trash, Upload, Variable } from "lucide-react"
import { createFlowObject } from "../lib/build-json"
import { useFlowStore } from "../store/flow-store"
import { Button } from "./ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"


export function Toolbar() {

  const { formDialogBotName, activateBot, isLoadingFlow, nodesValidation, setDialogProps, setFormDialogStatus, setIsFormDialogOpen, setShowSnackBarMessage, handleFlowZoneCheckIfAllHandlesAreConnected } = useFlowStore()
  function hasFalseValue(obj: Record<string, boolean>): boolean {
    return Object.values(obj).includes(false);
  }
  const handleActivate = () => {
    const warnings = []


    const connected = handleFlowZoneCheckIfAllHandlesAreConnected()
    if (!connected) {
      warnings.push({
        id: "missing-handler",
        title: "Missing Connections",
        description:
          "Please connect all the nodes together.",
        severity: "high",
      })
      // setShowSnackBarMessage({ open: true, message: "Please make sure all nodes are connected!", color: "destructive", duration: 3000 })
    }
    if (hasFalseValue(nodesValidation)) {
      warnings.push({
        id: "missing-name",
        title: "Missing Configuration data",
        description: "Please fill all the fields in all nodes.",
        severity: "high",
      })
      // setShowSnackBarMessage({ open: true, message: "Please make sure all nodes are valid!", color: "destructive", duration: 3000 })
    }
    if (warnings.length > 0) {
      setIsFormDialogOpen(true)
      setDialogProps({ warnings })
      setFormDialogStatus("validation")
    } else {
      const data = createFlowObject()
      activateBot({
        param: data
      })
    }
  }
  const handleChangeName = () => {
    setFormDialogStatus("changeName")
    setIsFormDialogOpen(true)
  }

  return (
    <>

      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img src="./ubility-logo.png" alt="Ubility" width={150} height={52} className="h-10 w-auto" />
            <div className="w-px h-6 bg-gray-300"></div>
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
                        variant="ghost"
                        className="flex items-center font-medium gap-1 p-0 h-auto text-base"
                      >
                        {/* <AlignJustify className="w-4 h-4" /> */}
                        {formDialogBotName}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onSelect={handleChangeName}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Change Name</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem onSelect={() => console.log("Import")}>
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Import</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => console.log("Export")}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Export</span>
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
          </div>

        </div>

        <div className="flex items-center space-x-2">

          <Button variant="outline" size="sm" onClick={() => {
            setFormDialogStatus("ManageCred")
            setIsFormDialogOpen(true)
          }
          }>
            <Key className="w-4 h-4" />
            Credentials
          </Button>
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


          <Button variant="outline" size="sm" onClick={() => {
            setIsFormDialogOpen(true);
            setFormDialogStatus("variables");
          }}>
            <Variable className="w-4 h-4" />
            Variables
          </Button>
          <Button
            onClick={handleActivate}
            variant={isLoadingFlow ? "destructive" : "default"}
            size="sm"
            disabled={isLoadingFlow}
            className={isLoadingFlow ? "cursor-not-allowed opacity-80" : ""}
          >
            {isLoadingFlow ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Activating bot...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Activate Bot
              </>
            )}
          </Button>
        </div>
      </div >
    </>
  )
}
