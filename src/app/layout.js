import MainLayout from "./Components/Common/MainLayout";
import "./globals.css";

export const metadata = {
  title: "Document parser",
  description: "Made by Ruposhi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
