import { createContext, useState, useContext } from "react";
import IClient from "../pages/clients/IClient";

interface ClientsContextType {
  clients: Partial<IClient>[];
  setClients: React.Dispatch<React.SetStateAction<Partial<IClient>[]>>;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return context;
};

export const ClientsProvider: React.FC<any> = ({ children }) => {
  const [clients, setClients] = useState<Partial<IClient>[]>([]);

  return (
    <ClientsContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientsContext.Provider>
  );
};
