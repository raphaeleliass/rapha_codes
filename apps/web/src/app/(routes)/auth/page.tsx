"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/useUserStore";

const formSchema = z.object({
	email: z.email("E-mail inválido.").nonempty("Insira o email para continuar"),
	password: z.string().nonempty("Insira a senha para continuar"),
});

type FormType = z.infer<typeof formSchema>;

export default function Page() {
	const [isPasswordVisible, setPasswordVisisble] = useState<boolean>(false);
	const { setUser, user } = useUserStore();
	const router = useRouter();

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { isSubmitting } = useFormState({ control: form.control });

	// biome-ignore lint: unnecessary add dependencies
	useEffect(() => {
		(() => {
			if (!user) return;

			return redirect("/");
		})();
	}, []);

	async function handleSubmitForm({ email, password }: FormType) {
		await authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onSuccess: (c) => {
					setUser(c.data.user);
					toast.success("Login realizado com sucesso!");
					router.push("/dashboard");
				},
				onError: (c) => {
					if (c.error.statusText) {
						toast.error(c.error.statusText);
						return;
					}

					toast.error(c.error.message);
				},
			},
		);
	}

	function togglePasswordVisibility() {
		setPasswordVisisble((prev) => !prev);
	}

	return (
		<div className="min-h-dvh w-full place-content-center justify-items-center">
			<Card className="w-full max-w-sm">
				<CardContent>
					<Form {...form}>
						<form
							id={"loginForm"}
							onSubmit={form.handleSubmit(handleSubmitForm)}
						>
							<FieldGroup>
								<FieldSet>
									<FieldLegend>Entrar</FieldLegend>
									<FieldDescription>
										Preencha suas credenciais para continuar
									</FieldDescription>
									<FieldGroup>
										<Field>
											<FormField
												name={"email"}
												control={form.control}
												render={({ field }) => (
													<FormItem>
														<FormLabel>E-mail</FormLabel>

														<FormControl>
															<Input
																type="email"
																autoComplete="off"
																placeholder="Digite seu email"
																{...field}
																disabled={isSubmitting}
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</Field>

										<Field>
											<FormField
												name={"password"}
												control={form.control}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Senha</FormLabel>

														<FormControl>
															<div className="relative flex items-center">
																<Input
																	type={isPasswordVisible ? "text" : "password"}
																	autoComplete={"off"}
																	placeholder="Digite sua senha"
																	{...field}
																	disabled={isSubmitting}
																/>
																<button
																	type="button"
																	onClick={togglePasswordVisibility}
																	className="absolute right-2 p-1"
																>
																	{isPasswordVisible ? (
																		<EyeClosed size={20} />
																	) : (
																		<Eye size={20} />
																	)}
																</button>
															</div>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</Field>
									</FieldGroup>
								</FieldSet>

								<FieldSeparator />

								<FieldSet>
									<FieldGroup>
										<Field>
											<Button
												type="submit"
												form="loginForm"
												className="w-full"
												disabled={isSubmitting}
											>
												{isSubmitting ? (
													<Loader className="animate-spin" />
												) : (
													"Entrar"
												)}
											</Button>
										</Field>
									</FieldGroup>
								</FieldSet>
							</FieldGroup>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
