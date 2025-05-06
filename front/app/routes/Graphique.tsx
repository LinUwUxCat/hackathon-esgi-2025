import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "2015", med: 5, pop: 2000 },
  { name: "2016", med: 8, pop: 2500 },
  { name: "2017", med: 12, pop: 3000 },
  { name: "2018", med: 16, pop: 4000 },
  { name: "2019", med: 21, pop: 4800 },
  { name: "2020", med: 25, pop: 5100 },
  { name: "2021", med: 30, pop: 6000 },
];

export default function Graphique() {
  return (
    <>
      <div className="flex h-full">
        {/* SIDEBAR */}
        <div className="w-1/4 bg-[#c7a77b] m-4 rounded-xl p-4">
          {/* Détails, filtres ou légendes */}
          <h2 className="text-white text-xl font-bold mb-4">Informations</h2>
          {/* Tranches d’âges */}
          <div className="mb-4">
            <h3 className="text-white font-semibold">Tranches d'âges</h3>
            <ul className="text-white text-sm ml-2">
              <li>0-14 ans : 15%</li>
              <li>15-64 ans : 60%</li>
              <li>65+ ans : 25%</li>
            </ul>
          </div>

          {/* Médecins */}
          <div className="mb-4">
            <h3 className="text-white font-semibold">Médecins</h3>
            <p className="text-white text-sm ml-2">32 médecins recensés</p>
          </div>

          {/* Population */}
          <div className="mb-4">
            <h3 className="text-white font-semibold">Population</h3>
            <p className="text-white text-sm ml-2">8 532 habitants</p>
          </div>
        </div>

        {/* ZONE GRAPHIQUE */}
        <div className="w-3/4 m-4 rounded-xl p-4 bg-white">
          <div className="flex justify-end mb-2 gap-2">
            {/* Icônes (images statiques) */}
            <button title="Calendrier">📅</button>
            <button title="Zoom">🔍</button>
            <button title="Filtrer">⚙️</button>
          </div>

          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="med" fill="#fbbf24" />
            <Bar dataKey="pop" fill="#3b82f6" />
          </BarChart>

          <LineChart
            width={600}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pop" stroke="#0ea5e9" />
          </LineChart>
        </div>
      </div>
    </>
  );
}
