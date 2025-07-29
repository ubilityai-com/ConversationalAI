import { useState, useMemo, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { ScrollArea } from "../../ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Trash2, RefreshCcw, Filter } from "lucide-react"
import { useCredentialStore } from "../../../store/credentials-store"

interface ManageCredentialsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ManageCredentialsDialog({ open, onOpenChange }: ManageCredentialsDialogProps) {
    const {
        loading,
        credentials,
        deleteCred,
        fetchCreds,
    } = useCredentialStore()

    const [search, setSearch] = useState("")
    const [typeFilter, setTypeFilter] = useState<string | null>(null)
    const [deletingIds, setDeletingIds] = useState<number[]>([])

    const [page, setPage] = useState(1)
    const pageSize = 5

    useEffect(() => {
        if (open) {
            fetchCreds?.()
        }
    }, [open])

    useEffect(() => {
        setPage(1)
    }, [typeFilter, search])

    const types = useMemo(
        () => Array.from(new Set(credentials.map((c) => c.type))),
        [credentials]
    )

    const filteredSorted = useMemo(() => {
        return credentials
            .filter((cred) => {
                const matchType = typeFilter ? cred.type === typeFilter : true
                const matchSearch = cred.name.toLowerCase().includes(search.toLowerCase())
                return matchType && matchSearch
            })
            .sort((a, b) => parseInt(b.created_at) - parseInt(a.created_at)) // latest first
    }, [credentials, search, typeFilter])

    const totalPages = Math.ceil(filteredSorted.length / pageSize)
    const paginated = filteredSorted.slice((page - 1) * pageSize, page * pageSize)

    const handleDelete = async (id: any) => {
        setDeletingIds((prev) => [...prev, id])
        try {
            await deleteCred(id)
        } finally {
            setDeletingIds((prev) => prev.filter((itemId) => itemId !== id))
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Manage Credentials</DialogTitle>
                    <DialogDescription>
                        View and manage your connected credentials.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
                    <div className="relative w-full max-w-sm">
                        <Input
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-10"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => fetchCreds?.()}
                            className="absolute right-0 top-0 h-full"
                        >
                            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </Button>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4" />
                                {typeFilter ?? "All"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 max-h-60 overflow-auto">
                            <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                                <span className="flex items-center gap-2">
                                    All
                                </span>
                            </DropdownMenuItem>
                            {types.map((type) => (
                                <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                                    <span className="flex items-center gap-2">
                                        <img
                                            src={`/components-icons/${type}.png`}
                                            width={18}
                                            height={18}
                                            alt={type}
                                        />
                                        {type}
                                    </span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <ScrollArea className="max-h-[50vh]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.length > 0 ? (
                                paginated.map((cred) => (
                                    <TableRow key={cred.id}>
                                        <TableCell>{cred.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={`/components-icons/${cred.type}.png`}
                                                    alt={cred.type}
                                                    width={20}
                                                    height={20}
                                                />
                                                {cred.type}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {new Date(parseInt(cred.created_at) * 1000).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                disabled={deletingIds.includes(cred.id)}
                                                onClick={() => handleDelete(cred.id)}
                                            >
                                                {deletingIds.includes(cred.id) ? (
                                                    <RefreshCcw className="h-4 w-4 animate-spin text-destructive" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                        No credentials found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center pt-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
