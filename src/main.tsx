import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { Provider } from "@/components/ui/provider";
import { Provider as ReduxProvider } from "react-redux";
import "./styles/global.scss";
import { store } from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <App />
      </Provider>
    </ReduxProvider>
  </StrictMode>,
)