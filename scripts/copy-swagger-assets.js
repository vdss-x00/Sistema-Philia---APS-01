import { cpSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const swaggerAssetsPath = dirname(
  require.resolve("swagger-ui-dist/absolute-path"),
);
const publicAssetsPath = resolve("public", "api-docs");

mkdirSync(publicAssetsPath, { recursive: true });
cpSync(swaggerAssetsPath, publicAssetsPath, { recursive: true });
