export default function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className="text-3xl text-custom-darkTeal font-bold">{children}</h1>
  );
}
