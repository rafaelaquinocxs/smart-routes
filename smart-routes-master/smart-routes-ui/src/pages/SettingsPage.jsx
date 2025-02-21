import { useState } from "react";
import { Save, UserCircle, Bell, Lock, Globe, Database } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-text">Configurações</h1>
            <p className="text-text mt-2 opacity-80">Gerencie as configurações do sistema.</p>
          </header>

          <div className="space-y-6">
            {/* Seção: Perfil do Administrador */}
            <section className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <UserCircle size={24} /> Perfil do Administrador
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text/60 mb-1">Nome</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    placeholder="Nome do administrador"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text/60 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>
            </section>

            {/* Seção: Configurações do Sistema */}
            <section className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Database size={24} /> Configurações do Sistema
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text/60 mb-1">URL da API</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    placeholder="https://api.exemplo.com"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-text/60 mb-1">Chave da API do Google Maps</label>
                  <input
                    type={apiKeyVisible ? "text" : "password"}
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    placeholder="Digite sua chave da API"
                  />
                  <button
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    className="absolute right-3 top-9 text-sm text-primary hover:underline"
                  >
                    {apiKeyVisible ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bell size={20} className="text-text/60" /> Notificações por Email
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary relative">
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          notificationsEnabled ? "translate-x-full" : ""
                        }`}
                      ></span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Seção: Segurança */}
            <section className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Lock size={24} /> Segurança
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text/60 mb-1">Nova Senha</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text/60 mb-1">Confirmar Senha</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
                <Save size={20} /> Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
