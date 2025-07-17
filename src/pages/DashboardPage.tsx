import { useState, useEffect } from 'react';
import UnifiedInbox from "../components/UnifiedInbox";
import ServiceCard from "../components/ServiceCard";
import { accountStorage } from "../services/accountStorage";
import { blink } from '../blink/client';

const services = [
  { name: "ChatGPT", provider: "OpenAI" },
  { name: "Claude", provider: "Anthropic" },
  { name: "Gemini", provider: "Google" },
  { name: "Grok", provider: "X AI" },
];

const DashboardPage = () => {
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

  return (
    <div>
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Connect your accounts</h2>
        </div>
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
      </section>
      <UnifiedInbox />
    </div>
  );
};

export default DashboardPage;