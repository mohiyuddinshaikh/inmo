"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from 'react-redux';
import { store } from "@/lib/store";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
