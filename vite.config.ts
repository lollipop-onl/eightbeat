import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	css: {
		transformer: "lightningcss",
	},
	build: {
		cssMinify: "lightningcss",
	},
	plugins: [react(), TanStackRouterVite(), tsconfigPaths(), tailwindcss()],
});
