import { ClientsProvider } from "./ClientsContext";
import { UserProvider } from "./UserContext";

const AppContext: React.FC<any> = ({ children }) => {
  return (
    <UserProvider>
      <ClientsProvider>{children}</ClientsProvider>
    </UserProvider>
  );
};

export default AppContext;
