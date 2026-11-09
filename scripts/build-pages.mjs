import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] || "rika-personal-site";
const basePath = repository.endsWith(".github.io") ? "" : `/${repository}`;
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build", "--webpack"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath, NEXT_TELEMETRY_DISABLED: "1" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
writeFileSync("out/.nojekyll", "");
