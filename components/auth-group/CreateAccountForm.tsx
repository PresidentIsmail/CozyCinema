"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { createNewUser } from "@/lib/mongodb-api/create-account";

import { PiSpinnerBold } from "react-icons/pi";
import { ErrorIcon } from "@/components/ui/icons/Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const CreateAccountForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "dev@email.com",
      password: "developer",
      firstName: "mynamejeff",
      lastName: "lastnamejeff",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback");

  // function to handle form submission
  async function onSubmit(userData: FormData) {
    setSubmitting(true);

    try {
      // Create account
      await createNewUser(userData);

      // if there is a callback url, redirect to it
      router.push(callbackUrl || "/");
    } finally {
      // Set loading to false after a delay
      setTimeout(() => {
        setSubmitting(false);
      }, 500);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex   w-[500px] flex-col items-center justify-center gap-y-8 px-12 py-6 md:rounded-md md:bg-[#dedede0f] md:py-10"
      >
        {/* email */}
        <div className="grid w-full gap-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold tracking-wide md:text-base"
          >
            Email Address *
          </Label>
          <Input
            disabled={submitting} // Disable when submitting
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address.",
              },
            })}
            id="email"
            className={`h-full rounded-md bg-black/30 px-2 py-3 text-sm font-semibold text-white md:text-base  ${
              errors.email ? "border border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
              <ErrorIcon />
              {errors.email.message}
            </span>
          )}
        </div>

        {/* password */}
        <div className="grid w-full gap-2">
          <Label
            htmlFor="password"
            className="text-sm font-semibold tracking-wide md:text-base"
          >
            Password *
          </Label>
          <Input
            disabled={submitting} // Disable when submitting
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
            type="password"
            id="password"
            className={`h-full rounded-md bg-black/30 px-2 py-3 text-sm font-semibold text-white md:text-base  ${
              errors.password ? "border border-red-500" : ""
            }`}
          />
          {/* Show validation error message */}
          {errors.password && (
            <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
              <ErrorIcon />
              {errors.password.message}
            </span>
          )}
        </div>

        {/* first name */}
        <div className="grid w-full gap-2">
          <Label
            htmlFor="firstName"
            className="text-sm font-semibold tracking-wide md:text-base"
          >
            First Name *
          </Label>
          <Input
            disabled={submitting} // Disable when submitting
            {...register("firstName", {
              required: "First name is required",
            })}
            id="firstName"
            className={`h-full rounded-md bg-black/30 px-2 py-3 text-sm font-semibold text-white md:text-base  ${
              errors.firstName ? "border border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
              <ErrorIcon />
              {errors.firstName.message}
            </span>
          )}
        </div>

        {/* last name */}
        <div className="grid w-full gap-2">
          <Label
            htmlFor="lastName"
            className="text-sm font-semibold tracking-wide md:text-base"
          >
            Last Name *
          </Label>
          <Input
            disabled={submitting} // Disable when submitting
            {...register("lastName", {
              required: "Last name is required",
            })}
            id="lastName"
            className={`h-full rounded-md bg-black/30 px-2 py-3 text-sm font-semibold text-white md:text-base  ${
              errors.lastName ? "border border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <span className="flex w-full items-center gap-x-1 text-sm tracking-wider text-red-500">
              <ErrorIcon />
              {errors.lastName.message}
            </span>
          )}
        </div>

        {/* submit button */}
        <Button
          type="submit"
          disabled={submitting}
          className="font-button-text mt-4 flex w-full items-center justify-center gap-x-2 rounded-md bg-[#e50914] font-semibold text-white transition-colors hover:bg-[#e50914]/70 md:text-base"
        >
          {submitting ? (
            <PiSpinnerBold className="animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </>
  );
};

export default CreateAccountForm;
