import React from 'react';

const ServiceCard = ({ name, provider, isConnected, onConnect, onDisconnect }) => {
  return (
    <div className="bg-secondary rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-muted-foreground mb-4">{provider}</p>
      </div>
      <button 
        onClick={() => isConnected ? onDisconnect(name) : onConnect(name, provider)}
        className={`w-full py-2 rounded-lg ${isConnected ? "bg-destructive/20 text-destructive" : "bg-accent text-accent-foreground"}`}>
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
};

export default ServiceCard;