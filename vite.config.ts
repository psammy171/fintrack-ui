import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "public/*"],
			registerType: "autoUpdate",
			manifest: {
				name: "Personal Finance Tool",
				short_name: "Fintrack",
				start_url: "/expenses",
				background_color: "#ffffff",
				theme_color: "#FFFFFF",
				icons: [
					{
						src: "icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			workbox: {
				// defining cached files formats
				globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
				skipWaiting: true,
				clientsClaim: true,
				cleanupOutdatedCaches: true,
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
