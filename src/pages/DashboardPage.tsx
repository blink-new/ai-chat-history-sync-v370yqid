import UnifiedInbox from "../components/UnifiedInbox";
import ServiceCard from "../components/ServiceCard";

const services = [
  { name: "ChatGPT", provider: "OpenAI" },
  { name: "Claude", provider: "Anthropic" },
  { name: "Gemini", provider: "Google" },
  { name: "Grok", provider: "X AI" },
];

const DashboardPage = () => {
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
            />
          ))}
        </div>
      </section>
      <UnifiedInbox />
    </div>
  );
};

export default DashboardPage;