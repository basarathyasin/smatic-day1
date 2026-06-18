export default function Footer() {
  return (
   <footer className="bg-[#F3F4F5] px-12  py-12">
  <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h2 className="font-heading text-xl font-bold">
        VITE
      </h2>

      <p className="mt-6 text-base text-[#6B7280]">
        © 2024 Premium SaaS. All rights reserved..
      </p>
    </div>

    <div className="flex flex-wrap gap-x-12 gap-y-8 items-center text-base text-[#6B7280]">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Security</a>
      <a href="#">Status</a>
      <a href="#">Twitter</a>
      <a href="#">LinkedIn</a>
    </div>
  </div>
</footer>
  );
}