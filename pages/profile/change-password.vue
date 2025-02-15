<template>
    <div class="relative flex justify-center">
      <div
        class="absolute inset-0 z-[1]"
      />
      <div class="relative z-[2] w-full max-w-[340px] px-5">

        <form class="mt-10" @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput label="Mật khẩu hiện tại" type="password" name="oldpassword" placeholder="••••••••" />
            <UiVeeInput label="Mật khẩu mới" type="password" name="password" placeholder="••••••••" />
            <UiVeeInput
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
            />
            <ul class="flex flex-col gap-4">
              <li class="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon
                  :class="[meta.valid ? 'text-green-500' : '']"
                  class="size-4"
                  name="lucide:check-circle-2"
                />
                <span>Tối thiểu 8 kí tự</span>
              </li>
              <li class="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon
                  :class="[meta.valid ? 'text-green-500' : '']"
                  class="size-4"
                  name="lucide:check-circle-2"
                />
                <span>Ít nhất 1 kí tự số & 1 kí tự đặc biệt</span>
              </li>
            </ul>
            <UiButton class="w-full" type="submit" text="Đổi mật khẩu" />
          </fieldset>
        </form>
      </div>
    </div>
  </template>
  
<script lang="ts" setup>
  import { useAppPageStore } from "@/stores/appPageStore";

    import { object, string, ref as yupRef } from "yup";
    import type { InferType } from "yup";

    const appPageStore = useAppPageStore();

    const breadCrumbItems = [
        {
            label: "Đổi mật khẩu",
        }
    ]
    
    const LoginSchema = object({
      oldpassword: string()
        .required("Vui lòng nhập mật khẩu cũ")
        .min(8, 'Mật khẩu ít nhất 8 kí tự')
        .label("Mật khẩu cũ"),
      password: string()
        .required("Vui lòng nhập mật khẩu mới")
        .min(8,'Mật khẩu ít nhất 8 kí tự')
        .label("Mật khẩu mới")
        .test("password", "Mật khẩu phải chứa 1 số và 1 kí tự đặc biệt", (value) => {
          return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value);
        }),
      confirmPassword: string()
        .required("Xác nhận mật khẩu phải trùng với mật khẩu mới")
        .oneOf([yupRef("password")], "Xác nhận mật khẩu phải trùng với mật khẩu mới"),
    });

    onBeforeMount(() => {
        appPageStore.setBreadcrumbItems(breadCrumbItems);
    });
  
    const { handleSubmit, isSubmitting, meta } = useForm<InferType<typeof LoginSchema>>({
      validationSchema: LoginSchema,
    });
  
    const submit = handleSubmit(async (_) => {
      useSonner("Password updated", {
        description: "Your password has been updated successfully.",
      });
    });
</script>
  