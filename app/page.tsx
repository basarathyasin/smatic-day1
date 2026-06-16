"use client";

import BasicForm from "@/components/forms/BasicForm";
import {
	Card,
	CardContent,
	CardDescription,

	CardHeader,
	CardTitle,
} from "@/components/ui/card";



export default function Home() {
	return (
		<main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight">
						Welcome Back
					</h1>
				</div>

				<Card className="shadow-lg">
					<CardHeader>
						<CardTitle>Login</CardTitle>

						<CardDescription>
							Enter your details below
						</CardDescription>
					</CardHeader>

					<CardContent>
						<BasicForm />
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
