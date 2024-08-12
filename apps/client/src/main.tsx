import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ApolloProvider } from "./lib/apollo-client"
import { Router } from "./lib/tanstack-router"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider>
      <Router />
    </ApolloProvider>
  </StrictMode>,
)
