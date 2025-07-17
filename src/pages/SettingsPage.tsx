import { useState, useEffect } from 'react';
import ServiceCard from "../components/ServiceCard";

const services = [
  { name: "ChatGPT", provider: "OpenAI" },
  { name: "Claude", provider: "Anthropic" },
  { name: "Gemini", provider: "Google" },
  { name: "Grok", provider: "X AI" },
];

const SettingsPage = () => {
  const [connectedAccounts, setConnectedAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('connectedAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });

  useEffect(() => {
    localStorage.setItem('connectedAccounts', JSON.stringify(connectedAccounts));
  }, [connectedAccounts]);

  const handleConnect = (serviceName: string, provider: string) => {
    setConnectedAccounts(prev => [...prev, { service_name: serviceName, provider }]);
  };

  const handleDisconnect = (serviceName: string) => {
    setConnectedAccounts(prev => prev.filter(acc => acc.service_name !== serviceName));
  };

  const handleClearAll = () => {
    setConnectedAccounts([]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button onClick={handleClearAll} className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;