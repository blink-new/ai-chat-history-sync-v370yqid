import { useState, useEffect } from 'react';
import ServiceCard from "../components/ServiceCard";
import { accountStorage } from "../services/accountStorage";
import { blink } from '../blink/client';

const services = [
  { name: "ChatGPT", provider: "OpenAI" },
  { name: "Claude", provider: "Anthropic" },
  { name: "Gemini", provider: "Google" },
  { name: "Grok", provider: "X AI" },
];

const SettingsPage = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadAccounts = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await accountStorage.initialize(user.id);
        const accounts = await accountStorage.getAccounts();
        setConnectedAccounts(accounts);
      } catch (error) {
        console.error('Failed to load accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, [user]);

  const handleConnect = async (serviceName: string, provider: string) => {
    if (!user?.id) return;
    
    await accountStorage.addAccount(serviceName, provider);
    const accounts = await accountStorage.getAccounts();
    setConnectedAccounts(accounts);
  };

  const handleDisconnect = async (serviceName: string) => {
    if (!user?.id) return;
    
    await accountStorage.removeAccount(serviceName);
    const accounts = await accountStorage.getAccounts();
    setConnectedAccounts(accounts);
  };

  const handleClearAll = async () => {
    if (!user?.id) return;
    
    await accountStorage.clearAllAccounts();
    setConnectedAccounts([]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button 
          onClick={handleClearAll} 
          disabled={loading || connectedAccounts.length === 0}
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed">
          Clear All Connections
        </button>
      </div>
      <div className="bg-secondary rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Manage Connected Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <ServiceCard 
              key={service.name}
              name={service.name}
              provider={service.provider}
              isConnected={connectedAccounts.some(acc => acc.service_name === service.name)}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;