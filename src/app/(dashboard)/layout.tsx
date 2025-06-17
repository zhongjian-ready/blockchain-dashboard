export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </main>
  );
}
