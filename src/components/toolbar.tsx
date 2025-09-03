"use client"

import { ProjectBreadcrumb } from "./toolbar/project-breadcrumb"
import { ProjectStatusBadge } from "./toolbar/project-status-badge"
import { ToolbarActions } from "./toolbar/toolbar-actions"
import { ToolbarLogo } from "./toolbar/toolbar-logo"

export function Toolbar() {

    return (
        <div className="border-b bg-card">
            <div className="overflow-x-auto">
                <div className="flex items-center justify-between gap-4 px-6 py-3 min-w-max">
                    {/* Left Section: Logo and Breadcrumb */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                        <ToolbarLogo />
                        <ProjectBreadcrumb />
                        <ProjectStatusBadge />
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex-shrink-0">
                        <ToolbarActions />
                    </div>
                </div>
            </div>
        </div>
    )
}
