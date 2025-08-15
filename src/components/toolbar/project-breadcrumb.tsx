"use client"

import { useState } from "react"

import { ChevronDown, Home, Loader2, Plus, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { formatTimestamp } from "../../lib/utils"
import { useFlowStore } from "../../store/flow-store"
import { Badge } from "../ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { ProjectNameDropdown } from "./project-name-dropdown"

export function ProjectBreadcrumb() {
  const { selectedBot, botsList, isLoadingBotList, isLoadingBot, getBotById, resetData } = useFlowStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false)
  const filteredProjects = botsList.filter((bot) => bot.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const navigate = useNavigate()
  const handleProjectSelect = async (botId: number) => {
    if (selectedBot?.id === botId) return

    try {
      const bot = await getBotById(botId.toString())
      if (bot)
        navigate(`/${botId}`)
      setSearchQuery("")
      setShowProjectsDropdown(false)
    } catch (error) {
      console.error("Failed to switch project:", error)
    }
  }
  const handleCreateNewProject = () => {
    navigate("/")
    resetData()
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu open={showProjectsDropdown} onOpenChange={setShowProjectsDropdown}>
            <DropdownMenuTrigger asChild>
              <BreadcrumbLink
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault()
                  setShowProjectsDropdown(!showProjectsDropdown)
                }}
              >
                <Home className="w-4 h-4" />
                Projects
                <ChevronDown className="w-3 h-3" />
              </BreadcrumbLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              <DropdownMenuItem
                onClick={handleCreateNewProject}
                className="flex items-center gap-2 p-3 cursor-pointer bg-primary/5 hover:bg-primary/10 border-b"
                disabled={false}
              >
                <Plus className="w-4 h-4 text-primary" />
                <span className="font-medium text-primary">
                  {"Create New Project"}
                </span>
              </DropdownMenuItem>
              <div className="px-2 py-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8 text-sm"
                  />
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                {isLoadingBotList && botsList.length === 0 ? (
                  <div className="px-2 py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Loading projects...</div>
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    {searchQuery ? "No projects found" : "No projects available"}
                  </div>
                ) : (
                  filteredProjects.map((bot) => (
                    <DropdownMenuItem
                      key={bot.id}
                      onClick={() => handleProjectSelect(bot.id)}
                      className={`flex items-center justify-between p-3 cursor-pointer ${bot.id === selectedBot?.id ? "bg-accent" : ""
                        }`}
                      disabled={isLoadingBot}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{bot.name}</span>
                          {bot.status === "Active" && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Live
                            </Badge>
                          )}
                          {bot.id === selectedBot?.id && (
                            <Badge variant="outline" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Modified {formatTimestamp(bot.updated_date)}</div>
                      </div>
                      {isLoadingBot && bot.id !== selectedBot?.id && <Loader2 className="w-3 h-3 animate-spin" />}
                    </DropdownMenuItem>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <ProjectNameDropdown />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
