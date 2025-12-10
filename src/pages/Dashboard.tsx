import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCog, LayoutDashboard, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// Utils
import { useAuthStore } from "@/stores/useAuthStore";

export default function Dashboard() {
	const { user, isSupervisor } = useAuthStore();

	// Static data instead of fetching from Supabase
	const stats = {
		employees: 0,
		users: 0,
		menuItems: 0,
	};

	const statCards = [
		{
			title: "Total Employees",
			value: stats.employees,
			icon: Users,
			description: "Active employees in the system",
			visible: isSupervisor,
		},
		{
			title: "Total Users",
			value: stats.users,
			icon: UserCog,
			description: "Registered system users",
			visible: isSupervisor,
		},
		{
			title: "Menu Items",
			value: stats.menuItems,
			icon: LayoutDashboard,
			description: "Configured menu items",
			visible: true,
		},
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back, {user?.email || user?.username}! Here's an overview of your system.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{statCards
					.filter((card) => card.visible)
					.map((card) => {
						const Icon = card.icon;
						return (
							<Card key={card.title} className="transition-all hover:shadow-lg">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										{card.title}
									</CardTitle>
									<Icon className="h-5 w-5 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="flex items-baseline gap-2">
										<div className="text-3xl font-bold">{card.value}</div>
										<TrendingUp className="h-4 w-4 text-accent" />
									</div>
									<p className="mt-1 text-xs text-muted-foreground">
										{card.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
			</div>

			{isSupervisor && (
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							<Link
								to="/utilities/user-files"
								className="rounded-lg border-2 border-primary/20 bg-card p-6 text-left transition-all hover:border-primary hover:shadow-md"
							>
								<UserCog className="mb-2 h-8 w-8 text-primary" />
								<h3 className="font-semibold">Manage Users</h3>
								<p className="text-sm text-muted-foreground">
									Control user access and roles
								</p>
							</Link>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}