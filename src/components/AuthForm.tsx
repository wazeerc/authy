"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Credentials, FormProps } from "@/types";
import React from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}) satisfies z.ZodType<Credentials>;

export function AuthForm({
  action,
  buttonText,
  onSubmit,
  isSuccess,
  activeUsername,
}: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: activeUsername || "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  React.useEffect(() => {
    if (activeUsername) {
      form.setValue("username", activeUsername);

      (document.querySelector(
        'input[name="password"]',
      ) as HTMLInputElement)!.focus();
    }
  }, [activeUsername, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-gray-200">Username</FormLabel>
              <FormControl>
                <Input
                  className="dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  placeholder={`${action === "login" ? "Enter" : "Choose"} your username`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-gray-200">Password</FormLabel>
              <FormControl>
                <Input
                  className="dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  type="password"
                  placeholder={`${action === "login" ? "Enter" : "Choose"} your password`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <Button
          className="text-md font-regular w-full uppercase dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700"
          type="submit"
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  );
}
