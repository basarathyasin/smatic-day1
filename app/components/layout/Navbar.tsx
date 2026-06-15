interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <nav>
      <h2>{title}</h2>
    </nav>
  );
}