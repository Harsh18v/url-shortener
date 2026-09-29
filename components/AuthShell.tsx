import Logo from "./Logo";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-panel">
      <div className="border-b border-line bg-paper">
        <div className="container-page flex h-16 items-center">
          <Logo />
        </div>
      </div>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="border border-line bg-paper p-8">
            <div className="border-t-2 border-knot pt-4">
              <h1 className="text-2xl">{title}</h1>
              <p className="mt-2 text-sm text-muted">{subtitle}</p>
            </div>

            <div className="mt-8">{children}</div>
          </div>

          <p className="mt-6 text-center text-sm text-muted">{footer}</p>
        </div>
      </main>
    </div>
  );
}
