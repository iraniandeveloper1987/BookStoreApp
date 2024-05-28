const { build } = require("esbuild");

build({
  entryPoints: ["src/index.js"],
  bundle: true,
  outfile: "public/bundle.js",
  loader: {
    ".js": "jsx",
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
