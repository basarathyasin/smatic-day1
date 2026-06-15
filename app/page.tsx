"use client";

import BasicForm from "./components/forms/BasicForm";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome
          </h1>

          <BasicForm />
        </div>


      </div>
    </main>
  );
}