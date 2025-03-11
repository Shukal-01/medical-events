"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const defaultTab = searchParams.get("type") || "user"

  const [userType, setUserType] = useState(defaultTab)
  const [isLoading, setIsLoading] = useState(false)

  // User form state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    location: "",
  })

  // Doctor form state
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    qualifications: "",
    experience: "",
    location: "",
  })

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDoctorData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (userData.password !== userData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      })
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would be an API call to register
      console.log("Registering user", userData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      })

      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was a problem with your registration.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDoctorRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (doctorData.password !== doctorData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      })
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would be an API call to register
      console.log("Registering doctor", doctorData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Registration successful",
        description: "Your doctor account has been created. You can now log in.",
      })

      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was a problem with your registration.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-full min-h-screen w-screen flex-col items-center justify-center py-10">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">← Back</Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Register to access the platform</p>
        </div>
        <Tabs defaultValue={defaultTab} className="w-full" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="doctor">Doctor</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <Card>
              <form onSubmit={handleUserRegister}>
                <CardHeader>
                  <CardTitle>User Registration</CardTitle>
                  <CardDescription>Create an account to book medical events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={userData.name}
                      onChange={handleUserChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={userData.email}
                      onChange={handleUserChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        id="gender"
                        name="gender"
                        placeholder="Male/Female/Other"
                        value={userData.gender}
                        onChange={handleUserChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="30"
                        value={userData.age}
                        onChange={handleUserChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, Country"
                      value={userData.location}
                      onChange={handleUserChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={userData.password}
                      onChange={handleUserChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={userData.confirmPassword}
                      onChange={handleUserChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="doctor">
            <Card>
              <form onSubmit={handleDoctorRegister}>
                <CardHeader>
                  <CardTitle>Doctor Registration</CardTitle>
                  <CardDescription>Create an account to host medical events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Full Name</Label>
                    <Input
                      id="doctorName"
                      name="name"
                      placeholder="Dr. Jane Smith"
                      value={doctorData.name}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorEmail">Email</Label>
                    <Input
                      id="doctorEmail"
                      name="email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={doctorData.email}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      placeholder="Cardiology, Neurology, etc."
                      value={doctorData.specialization}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Textarea
                      id="qualifications"
                      name="qualifications"
                      placeholder="MD, PhD, Board Certifications, etc."
                      value={doctorData.qualifications}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (years)</Label>
                    <Input
                      id="experience"
                      name="experience"
                      placeholder="10+ years in the field"
                      value={doctorData.experience}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorLocation">Location</Label>
                    <Input
                      id="doctorLocation"
                      name="location"
                      placeholder="City, Country"
                      value={doctorData.location}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorPassword">Password</Label>
                    <Input
                      id="doctorPassword"
                      name="password"
                      type="password"
                      value={doctorData.password}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorConfirmPassword">Confirm Password</Label>
                    <Input
                      id="doctorConfirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={doctorData.confirmPassword}
                      onChange={handleDoctorChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

