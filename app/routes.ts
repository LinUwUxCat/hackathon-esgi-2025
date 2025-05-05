import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // Pour ajouter une route : 
    // route("route_name", "routes/my_route.tsx")
] satisfies RouteConfig;
