"use client"

import { useForm } from "react-hook-form"
import Link from "next/link"
import { IoMdArrowBack } from "react-icons/io"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"
import { z } from "zod"
import { signInSchema } from "~/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "~/hooks/use-toast"
import { useRouter } from "next/navigation"

type FormValues = z.infer<typeof signInSchema>

const Signin = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(signInSchema) })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })

      const json = await res.json()

      if (!res.ok) {
        toast({
          title: "Sign in failed",
          description: json.error || "Unknown error",
          variant: "destructive",
        })
        return
      }

      // Save JWT token (example using localStorage)
      localStorage.setItem("token", json.token)

      toast({
        title: "Signed in",
        description: "Welcome back!",
      })

      router.push("/dashboard")
    } catch {
      toast({
        title: "Sign in failed",
        description: "Network error",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2">
          <IoMdArrowBack className="h-4 w-4" />
          <p className="leading-7">Go back</p>
        </Link>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password below to sign in.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="mail@gmail.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register("password")} id="password" type="password" />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <Link href="/signup">
                <Button variant="link">Don&apos;t have an account?</Button>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Signin

