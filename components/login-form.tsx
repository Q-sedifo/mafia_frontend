"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/shared/schemas/loginSchema"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BadgeLoading } from "@/shared/ui/badge/badge-loading"

export interface IInputs {
  email: string
  password: string
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IInputs>({
    resolver: zodResolver(loginSchema)
  })

  const router = useRouter()

  const handleLogin = async (data: IInputs) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (!result?.ok) {
        setError("root", {
          type: "manual",
          message: "Invalid email or password",
        })
      } else {
        router.push("/")
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Something went wrong",
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="w-full flex items-center justify-between">
            Login to your account
            {isSubmitting && (
              <BadgeLoading variant="outline"/>
            )}
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
              <Field>
                <FieldError errors={[errors.root]}/>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldError errors={[errors.email]}/>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FieldError errors={[errors.password]}/>
                <Input 
                  id="password"
                  type="password"
                  {...register("password")} 
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
