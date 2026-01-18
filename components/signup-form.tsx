"use client"

import { cn } from "@/lib/utils"
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
import { registerSchema } from "@/shared/schemas/registerSchema"
import Link from "next/link"
import { api } from "@/shared/api"
import { signIn } from "next-auth/react"
import { AxiosError } from "axios"
import { BadgeLoading } from "@/shared/ui/badge/badge-loading"

export interface IInputs {
  nickname: string
  email: string
  password: string
  passwordConfirmation: string
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IInputs>({
    resolver: zodResolver(registerSchema)
  })

  const handleRegister = async (data: IInputs) => {
    try {
      await api.post('/auth/register', {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      })

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setError('email', {
            type: 'manual',
            message: 'Email already exists',
          })
        } else {
          setError('root', {
            type: 'manual',
            message: 'Something went wrong',
          })
        }
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl w-full flex items-center justify-between">
            Create your account
            {isSubmitting && (
              <BadgeLoading variant="outline"/>
            )}
          </CardTitle>
          <CardDescription className="text-left">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FieldGroup>
              <Field>
                <FieldError errors={[errors.root]}/>
                <FieldLabel htmlFor="name">Nickname</FieldLabel>
                <FieldError errors={[errors.nickname]}/>
                <Input id="name" type="text" placeholder="John Doe" {...register("nickname")} />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldError errors={[errors.email]}/>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </Field>
              <Field>
                <FieldError errors={[errors.password]}/>
                <FieldError errors={[errors.passwordConfirmation]}/>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" {...register("password")} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" {...register("passwordConfirmation")} />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 5 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/signin">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
