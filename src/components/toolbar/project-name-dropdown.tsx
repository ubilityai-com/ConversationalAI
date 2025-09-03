"use client"

import { Check, ChevronDown, Edit2, Loader2, Trash2, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFlowStore } from "../../store/flow-store"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"

export function ProjectNameDropdown() {
  const { selectedBot, updateBot, deleteBot, isLoadingBot } = useFlowStore()
  const [isEditingName, setIsEditingName] = useState(false)
  const [editingName, setEditingName] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isDeletingProject, setIsDeletingProject] = useState(false)

  const navigate = useNavigate()
  const startEditingName = () => {
    if (!selectedBot) return
    setIsEditingName(true)
    setEditingName(selectedBot.name)
    setShowDropdown(false)
  }

  const cancelEditingName = () => {
    setIsEditingName(false)
    setEditingName("")
  }

  const saveProjectName = async () => {
    if (!selectedBot || !editingName.trim() || editingName === selectedBot.name) {
      cancelEditingName()
      return
    }
    try {
      await updateBot({ name: editingName.trim() })
      setIsEditingName(false)
      setEditingName("")
    } catch (error) {
      console.error("Failed to update project name:", error)
    }
  }

  const handleDeleteProject = () => {
    setShowDeleteConfirmation(true)
    setShowDropdown(false)
  }

  const confirmDeleteProject = async () => {
    setIsDeletingProject(true)
    try {
      await deleteBot()
      navigate("/");
      setShowDeleteConfirmation(false)

    } catch (error) {
      console.error("Failed to delete project:", error)
    }
    finally {
      setIsDeletingProject(false)
    }
  }

  if (!selectedBot) {
    return <span className="font-medium text-muted-foreground">Untitled</span>
  }

  if (isEditingName) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          className="h-6 text-sm font-medium w-auto max-w-44"
          onKeyDown={(e) => {
            if (e.key === "Enter") saveProjectName()
            if (e.key === "Escape") cancelEditingName()
          }}
          disabled={isLoadingBot}
          autoFocus
        />
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={saveProjectName} disabled={isLoadingBot}>
          {isLoadingBot ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
        </Button>
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={cancelEditingName} disabled={isLoadingBot}>
          <X className="w-3 h-3" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 font-medium text-foreground hover:text-blue-600 transition-colors rounded px-2 py-1 hover:bg-accent group">
            <span className="max-w-52 truncate" title={selectedBot.name}>{selectedBot.name}</span>
            <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem
            onClick={startEditingName}
            className="flex items-center gap-2 cursor-pointer"
            disabled={isDeletingProject}
          >
            <Edit2 className="w-4 h-4" />
            Change Name
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteProject}
            disabled={isDeletingProject}
            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteConfirmation} onOpenChange={(open) => {
        if (!isDeletingProject) {
          setShowDeleteConfirmation(open)
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedBot.name}"? This action cannot be undone and will permanently
              remove all project data, configurations, and chat history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingProject}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProject}
              disabled={isDeletingProject}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingProject ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Project
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
