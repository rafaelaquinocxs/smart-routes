import { useState } from "react";
import { Calendar, MapPin, MoreVertical, Pencil, Trash2, Eye, Plus } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Modal from "@/components/ui/Modal";

const routesData = [
  { id: "R001", date: "2024-02-20", containers: 12, status: "Concluída" },
  { id: "R002", date: "2024-02-20", containers: 8, status: "Em andamento" },
  { id: "R003", date: "2024-02-21", containers: 15, status: "Agendada" },
];

const RoutesPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Concluída":
        return `${base} bg-green-100 text-green-700`;
      case "Em andamento":
        return `${base} bg-blue-100 text-blue-700`;
      case "Agendada":
        return `${base} bg-yellow-100 text-yellow-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text">Rotas</h1>
              <p className="text-text mt-2 opacity-80">Gerencie e otimize as rotas de coleta.</p>
            </div>
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={16} /> Nova Rota
            </button>
          </header>

          <section className="glass-panel rounded-xl p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-secondary">
                  <th className="p-4 text-left font-medium text-text/60">ID</th>
                  <th className="p-4 text-left font-medium text-text/60">Data</th>
                  <th className="p-4 text-left font-medium text-text/60">Contêineres</th>
                  <th className="p-4 text-left font-medium text-text/60">Status</th>
                  <th className="p-4 text-left font-medium text-text/60">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {routesData.map((route) => (
                  <tr key={route.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="p-4 font-medium">{route.id}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Calendar size={16} className="text-text/60" /> {route.date}
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      <MapPin size={16} className="text-text/60" /> {route.containers} contêineres
                    </td>
                    <td className="p-4">
                      <span className={getStatusBadge(route.status)}>{route.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg" title="Ver detalhes">
                          <Eye size={16} className="text-text/60" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg" title="Editar">
                          <Pencil size={16} className="text-text/60" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg" title="Excluir">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {isModalOpen && (
            <Modal onClose={() => setModalOpen(false)} title="Criar Nova Rota">
              <form className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-text/60 mb-1">Data da Rota</label>
                  <input type="date" className="w-full px-3 py-2 rounded-lg border bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text/60 mb-1">Quantidade de Contêineres</label>
                  <input type="number" min="1" className="w-full px-3 py-2 rounded-lg border bg-white" placeholder="Ex: 10" />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </main>
    </div>
  );
};

export default RoutesPage;
