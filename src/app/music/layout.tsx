import ClientLayout from "@/components/ClientLayout/ClientLayout";

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}