/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  experimental: {
    typedRoutes: true,
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
