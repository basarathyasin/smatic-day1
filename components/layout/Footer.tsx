export default function Footer() {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-62xl items-center justify-between px-6 py-4">
        <p className="text-sm text-muted-foreground justify-bottom">
          © 2026 Store. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}