import React from 'react';

const ServiceCard = ({ name, provider, isConnected, onConnect, onDisconnect, loading = false }) => {
  return (
    <div className="bg-secondary rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-muted-foreground mb-4">{provider}</p>
      </div>
      <button 
        onClick={() => isConnected ? onDisconnect(name) : onConnect(name, provider)}
        disabled={loading}
        className={`w-full py-2 rounded-lg transition-colors ${
          loading 
            ? "bg-muted text-muted-foreground cursor-not-allowed" 
            : isConnected 
              ? "bg-destructive/20 text-destructive hover:bg-destructive/30" 
              : "bg-accent text-accent-foreground hover:bg-accent/90"
        }`}>
        {loading ? "Loading..." : isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
};

export default ServiceCard;