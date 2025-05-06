import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Pour ajouter une route :
  route("graphique", "routes/Graphique.tsx"),
] satisfies RouteConfig;
