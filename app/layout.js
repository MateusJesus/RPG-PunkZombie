import "./css/globals.css";
import "./css/root.css";
import ThemeRegistry from "./theme-registry"; // Novo componente para o ThemeProvider
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";

export const metadata = {
  title: "Minha Aplicação",
  description: "Descrição do site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="dark_mode">
        <ThemeRegistry>
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
