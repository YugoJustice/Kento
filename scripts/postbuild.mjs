// GitHub Pages serves 404.html for unknown paths. Copying index.html there makes
// refreshing /product or /blog/... load the app instead of an error page.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
console.log("Created dist/404.html for SPA routing");
