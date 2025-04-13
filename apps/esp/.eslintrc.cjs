module.exports = {
	root: true,
	extends: ["custom-react"],
	parserOptions: {
		project: ["./tsconfig.json"],
		tsconfigRootDir: __dirname,
	},
	ignorePatterns: [
		"vite.config.mjs",
		"src/vite-env.d.ts",
		"tailwind.config.js",
		"vite-env.d.ts",
		"dist",
		".turbo",
		"node_modules",
	],
	overrides: [],
};
