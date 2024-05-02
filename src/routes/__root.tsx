import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const RootComponent = () => {
	return (
		<div>
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
