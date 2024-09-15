import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import ContextProvider from "./providers/ContextProvider";

export const metadata: Metadata = {
  title: "Task Manager App",
  description: "for all your tasks and todos",
};

export default function RootLayout(
  { children, }: Readonly<{children: React.ReactNode;}>
){
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <GlobalStyleProvider>
            <Sidebar />
            {children}
          </GlobalStyleProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
