/** @type {import('next').NextConfig} */

// Only activate static export in CI (GitHub Actions). Never on Vercel.
const isGHPages = process.env.GITHUB_PAGES === "true" && process.env.CI === "true";

// Set REPO_NAME as a GitHub Actions variable if your site lives at
// https://username.github.io/REPO_NAME  (project site).
// Leave it empty if you're deploying to https://username.github.io (user/org site).
const repoName = process.env.REPO_NAME || "";

const nextConfig = {
  // Static export for GitHub Pages; undefined = normal server mode locally
  output: isGHPages ? "export" : undefined,

  // Required when deploying to a subpath like /repo-name
  basePath: isGHPages && repoName ? `/${repoName}` : "",
  assetPrefix: isGHPages && repoName ? `/${repoName}/` : "",

  // next/image optimisation requires a server; must be off for static export
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isGHPages,
    remotePatterns: [],
  },

  // trailingSlash improves compatibility with GitHub Pages directory serving
  trailingSlash: isGHPages,

  async headers() {
    if (isGHPages) return []; // no server to set headers on static pages
    return [
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
