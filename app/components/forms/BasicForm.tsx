"use client";

import { useState } from "react";
import Button from "../ui/Button";

export default function BasicForm() {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name.trim() || !age.trim()) {
			alert("Please fill all fields");
			return;
		}

		const ageNumber = Number(age);

		if (Number.isNaN(ageNumber)) {
			alert("Age must be a valid number");
			return;
		}

		alert(`Form Submitted: Name: ${name}, Age: ${age}`);

		setName("");
		setAge("");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-slate-700 mb-1"
				>
					Name
				</label>

				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter your name"
					className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<label
					htmlFor="age"
					className="block text-sm font-medium text-slate-700 mb-1"
				>
					Age
				</label>
				<input
					id="age"
					type="number"
					value={age}
					onChange={(e) => setAge(e.target.value)}
					placeholder="Enter Your Age"
					className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<Button text="Submit" />
		</form>
	);
}
