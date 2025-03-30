import "./css/globals.css";
import "./css/root.css";
import ThemeRegistry from "./theme-registry"; // Novo componente para o ThemeProvider
import Header from "./components/Header";

export const metadata = {
  title: "Minha Aplicação",
  description: "Descrição do site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark_mode">
        <ThemeRegistry> 
          <Header />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
