import DoctorMap from "~/components/map";
import type { Route } from "./+types/home";
import MapAndPegman from '../components/map&pegman';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
    <MapAndPegman />
    </>
  );
}
