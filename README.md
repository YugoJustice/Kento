# Kento

React + Vite + React Router + GSAP product launch site (7 pages).

## Run locally
1. `npm install`
2. `npm run dev` and open the URL it prints
3. `npm run build` to create the production build in `dist/`

## Replace the homepage image
Put your image in `public/` (e.g. `hero.png`) and set `heroImage = "hero.png"` at the top of `src/data/content.js`. Square images look best.

## Edit content
Text, prices, colours, blog posts, FAQs and the launch date live in `src/data/content.js`.

## Deploy to Vercel (easiest)
The project includes `.npmrc` (`legacy-peer-deps=true`) and an `installCommand` in `vercel.json`, so dependency version mismatches no longer break the install.

1. Push this folder to a GitHub repository.
2. Go to vercel.com, click **Add New → Project** and import the repo.
3. Leave the settings as they are (Vite is detected, and `vercel.json` handles routing).
4. Click **Deploy**. Refreshing `/product`, `/blog/...` etc. works without a 404.

Or with the CLI: `npm i -g vercel`, then run `vercel` in this folder and `vercel --prod` to go live.

## Deploy to Netlify or Cloudflare Pages
Build command `npm run build`, publish directory `dist`. The `public/_redirects` file already handles routing.

## Deploy to GitHub Pages
Already set up: the router uses the repo's base path, `404.html` is generated on build so refreshing any page works, and a workflow deploys on every push.
1. Push this folder to a GitHub repository on the `main` branch.
2. In the repo go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push again (or open the **Actions** tab and run "Deploy to GitHub Pages").
5. After about a minute your site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

If your repo is named `YOUR-USERNAME.github.io` the site is served at the root and the base path adjusts automatically.
