import "./css/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark_mode">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
