import { ProSidebarProvider } from "react-pro-sidebar";
import "./App.css";
import Routing from "@/routes/Routing";
import StoreProvider from "./stores/stores";

function App() {
  return (
    <StoreProvider>
      <ProSidebarProvider>
        <Routing />;
      </ProSidebarProvider>
    </StoreProvider>
  );
}

export default App;
