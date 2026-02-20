import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});




// import { defineConfig } from "vitest/config";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],

//   server: {
//     host: true,
//     allowedHosts: "all", // ✅ THIS FIXES YOUR ERROR
//   },

//   test: {
//     environment: "jsdom",
//     globals: true,
//     setupFiles: ["./src/test/setup.ts"],
//     include: ["src/**/*.{test,spec}.{ts,tsx}"],
//   },

//   resolve: {
//     alias: { "@": path.resolve(__dirname, "./src") },
//   },
// });