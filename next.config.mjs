/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
            canvas: "commonjs canvas",
        });
        return config;
    },
    images: {
      remotePatterns: [{
          protocol: "https",
          hostname: "liveblocks.io",
          port: "",
      }],
    },
    env: {
        LIVEBLOCKS_API_KEY: "pk_dev_uR4fxGH5SYchuZQb0S8wwQXdGxKgsdD5XTYGIAVjZ3W_j_2-9t0uwLc_ukYOzchW"
    }
};

export default nextConfig;
