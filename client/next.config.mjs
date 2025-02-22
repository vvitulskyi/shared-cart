/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  experimental: {
    typedRoutes: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
      exclude: /node_modules/,
    });

    config.cache = false;

    return config;
  },
  // redirects: () => {
  //   return [
  //     {
  //       source: "/cart-connection/:link",
  //       destination: "/?link=:link",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
