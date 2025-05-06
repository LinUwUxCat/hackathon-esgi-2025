import logo from "../assets/LOGO.webp";
import Graphique from "~/routes/Graphique";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#9CC3BE] px-4 py-1 flex justify-between items-center shadow-md">
      {/* Logo à gauche */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="LOGO" className="h-12 w-12 rounded-full" />
      </div>

      {/* Boutons à droite */}
      <div className="flex items-center gap-4">
        <button className="bg-[#548E99] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#0e769d] transition">
          Placer médecin
        </button>
        <button className="bg-[#548E99] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#0e769d] transition">
          Activer HeatMap
        </button>
        <Link className="nav-link" to="/Graphique">
          <button className="bg-[#548E99] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#0e769d] transition">
            Graphique
          </button>
        </Link>
        <Link className="nav-link" to="/">
          <button className="bg-[#548E99] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#0e769d] transition">
            Map
          </button>
        </Link>
      </div>
    </nav>
  );
}
