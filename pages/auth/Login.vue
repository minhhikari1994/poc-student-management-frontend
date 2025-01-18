<template>
    <div class="flex h-screen items-center justify-center">
        <div class="w-full max-w-[330px] px-5">
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
            <p class="mt-1 text-muted-foreground">Enter your email & password to log in.</p>

            <form class="mt-10" @submit="handleLogin">
                <fieldset :disabled="isSubmitting" class="grid gap-5">
                    <div>
                        <UiVeeInput label="Email" type="email" name="email" placeholder="john@example.com" />
                    </div>
                    <div>
                        <UiVeeInput label="Password" type="password" name="password" />
                    </div>
                    <div>
                        <UiButton class="w-full" type="submit" text="Log in" />
                    </div>
                </fieldset>
            </form>
            <p class="mt-8 text-sm">
                <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#">Forgot password?
                </NuxtLink>
            </p>
            <p class="mt-4 text-sm text-muted-foreground">
                Don't have an account?
                <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#">Create account
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script lang="js" setup>
import { object, string } from "yup";

import { useAuthStore } from "@/stores/authStore";

definePageMeta({
    layout: "auth",
});

const authStore = useAuthStore();

const LoginSchema = object({
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
});

const { handleSubmit, isSubmitting } = useForm({
    validationSchema: LoginSchema,
});

const handleLogin = handleSubmit(async (loginData) => {
    console.log(loginData)
    const result = await authStore.loginUser(loginData)
    if (result) {
        navigateTo("/");
    }
});

 
</script>