import { useReactFlow } from "@xyflow/react"
import { Edit, Key, Loader2, Save, Settings, Trash, Variable } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useFlowStore } from "../store/flow-store"
import { SearchableSelect } from "./custom/searchable-select"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu"
import { Switch } from "./ui/switch"

function hasFalseValue(obj: Record<string, boolean>): boolean {
  return Object.values(obj).includes(false);
}
export function Toolbar() {

  const { resetData, deleteBot, selectedBot, botsList, fetchBots, isLoadingBot, isLoadingActivate, nodesValidation, setDialogProps, setFormDialogStatus, setIsFormDialogOpen, setShowSnackBarMessage, handleFlowZoneCheckIfAllHandlesAreConnected } = useFlowStore()

  const navigate = useNavigate();
  const { botID } = useParams();
  console.log({ selectedBot });

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
        description: "Please fill all the required fields in all nodes.",
        severity: "high",
      })
      // setShowSnackBarMessage({ open: true, message: "Please make sure all nodes are valid!", color: "destructive", duration: 3000 })
    }
    if (warnings.length > 0) {
      setIsFormDialogOpen(true)
      setDialogProps({ warnings })
      setFormDialogStatus("validation")
    }
    else if (!selectedBot) {
      setIsFormDialogOpen(true)
      setFormDialogStatus("save")
    }
    else if (selectedBot.status === "Inactive") {
      // const data = createFlowObject()
      // activateBot({
      //   param: data
      // })
      // activateOrDeactivateBot("activate", selectedBot.id)
    }
    // else
    // activateOrDeactivateBot("deactivate", selectedBot.id)
  }
  console.log({ selectedBot });

  const handleChangeName = () => {
    setFormDialogStatus("changeName")
    setIsFormDialogOpen(true)
  }
  const { fitView } = useReactFlow()
  const handleChangeBot = (value: any) => {
    console.log({ value });

    if (value === "__create_new__") {
      resetData()
      navigate(`/`);
      fitView()
      return;
    } else {
      navigate(`/${value}`);
    }
  };

  console.log({ selectedBot });

  return (
    <>

      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img src="./ubility-logo.png" alt="Ubility" width={150} height={52} className="h-10 w-auto" />
            <div className="w-px h-6 bg-gray-300"></div>
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2 items-center text-base">
                {/* <NavigationMenuItem className="flex items-center gap-2"> */}
                {/* <Home size={18} className="text-muted-foreground" /> */}
                <SearchableSelect
                  loading={isLoadingBot}
                  showRefresh
                  className="min-w-48 border-none"
                  name="projectSelect"
                  placeholder="select a project"
                  value={botID}
                  onChange={(value) => {
                    handleChangeBot(value)
                  }}
                  options={[...botsList.map((el) => ({
                    label: el.name,
                    value: el.id.toString(),
                  })),
                  {
                    label: "+ Create New Bot",
                    value: "__create_new__",
                  }
                  ]
                  }
                  onRefresh={fetchBots}
                />
                {/* </NavigationMenuItem> */}

                <span className="text-muted-foreground mx-1">/</span>

                {/* Project name with dropdown */}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center font-medium gap-1 p-0 h-auto text-base"
                      >
                        {selectedBot?.name || "Draft"}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem disabled={!selectedBot} onSelect={handleChangeName}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Change Name</span>
                      </DropdownMenuItem>


                      <DropdownMenuItem onSelect={() => console.log("Settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        disabled={!selectedBot}
                        onSelect={() => deleteBot()}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete Bot</span>
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
            setFormDialogStatus("manageCred")
            setIsFormDialogOpen(true)
          }
          }>
            <Key className="w-4 h-4" />
            Credentials
          </Button>

          <Button variant="outline" size="sm" onClick={() => {
            setIsFormDialogOpen(true)
            if (!selectedBot)
              setFormDialogStatus("save")
            else
              setFormDialogStatus("update")
          }}>
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
          {isLoadingActivate ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <>
              <Switch
                checked={selectedBot?.status === "Active"}
                onCheckedChange={handleActivate}
              />
              <span>{selectedBot?.status === "Active" ? "Active" : "Inactive"}</span>
            </>
          )}

        </div>
      </div >
    </>
  )
}
