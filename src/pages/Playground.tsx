import { useState, useMemo } from "react";
import DataTable from "@/components/DataTable";
import { IColumn } from "@/components/DataTable/types";
import ActionTable from "@/components/DataTable/ActionTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, UserIcon, Trash2 } from "lucide-react";

interface User {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    role: string;
}

const Playground = () => {
    // Row selection state
    const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
    const userColumns: IColumn<User>[] = [
        { key: "username", header: "Name" },
        { key: "email", header: "Email" },
        { 
            key: "role", 
            header: "Role", 
            render: (row) => (
                <Select
                    value={row.role.toLowerCase()}
                    onValueChange={(newRole) => {
                        console.log(`Changed role for ${row.username} → ${newRole}`);
                    }}
                >
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="user">
                        <div className="flex items-center gap-2">
                        <UserIcon className="h-3 w-3" />
                            User
                        </div>
                    </SelectItem>
                    <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3" />
                            {row.role}
                        </div>
                    </SelectItem>
                    </SelectContent>
                </Select>
            ) 
        },
        {
            key: "isActive", 
            header: "Status",
            render: (row) => (
                <Badge variant={row.isActive ? "default" : "secondary"}>
                    {row.isActive ? 'Active' : "Inactive"}
                </Badge>
            ) 
        },
		{
			key: "actions",
			header: "Action",
			slotProps: { header: { className: 'flex justify-end items-center' } },
			render: (row) => (
				<div className="flex justify-end">
					<Button onClick={() => alert(`User Data:\n${JSON.stringify(row, null, 2)}`)}>
						View
					</Button>
				</div>
			),
		},
    ];

    const userData: User[] = useMemo(() => [
        { id: 1, username: "Alice Johnson", email: "alice@example.com", isActive: true, role: "Admin" },
        { id: 2, username: "Bob Smith", email: "bob@example.com", isActive: true, role: "User" },
        { id: 3, username: "Charlie Green", email: "charlie@example.com", isActive: true, role: "Moderator" },
        { id: 4, username: "Diana Prince", email: "diana@example.com", isActive: false, role: "User" },
        { id: 5, username: "Eve Wilson", email: "eve@example.com", isActive: true, role: "Moderator" },
    ], []);

    // Get selected rows
    const selectedRows = useMemo(() => {
        return userData.filter(user => selectedIds.has(user.id));
    }, [selectedIds, userData]);

    // Selection actions
    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) return;
        const names = selectedRows.map(row => row.username).join(", ");
        alert(`Would delete:\n${names}\n\nSelected IDs: ${Array.from(selectedIds).join(", ")}`);
        setSelectedIds(new Set());
    };

    const handleClearSelection = () => {
        setSelectedIds(new Set());
    };
    
    return (
        <div className="container space-y-6 py-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Playground</h1>
                <p className="text-muted-foreground">Interactive examples of DataTable features</p>
            </div>

            {/* Row Selection Example */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Row Selection Example</h2>
                        <p className="text-sm text-muted-foreground">
                            Select individual rows or use "Select All" to select all rows on the current page
                        </p>
                    </div>
                    {selectedRows.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {selectedRows.length} selected
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearSelection}
                            >
                                Clear
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDeleteSelected}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Selected
                            </Button>
                        </div>
                    )}
                </div>

                <ActionTable<User>
                    columns={userColumns}
                    data={userData}
                    totalPages={1}
                    currentPage={1}
                    enableRowSelection
                    getRowId={(row) => row.id}
                    selectedRowIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    selectAllMode="page"
                />

                {/* Selection Info */}
                {selectedIds.size > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-2">Selection Details:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>Selected IDs: {Array.from(selectedIds).join(", ")}</li>
                            <li>Selected Users: {selectedRows.map(r => r.username).join(", ")}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Playground