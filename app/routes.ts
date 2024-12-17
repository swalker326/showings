import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  // route("/showing/:id", "routes/showing.tsx"),
  route("/api/showing", "routes/api.showing.ts")
] satisfies RouteConfig;
