"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input, Button, Card, Spinner, TextField, Label, InputGroup } from "@heroui/react";
import { HiLockClosed, HiUser, HiEnvelope } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from '../lib/auth-client';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});



  // Handle Input Changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };



  // Form Validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Image Upload to ImgBB

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); // লোডিং শুরু
    try {


      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password
      });

      if (error) throw new Error(error.message);

      if (data) {
        toast.success("Account Created Successfull");
        setForm({ name: "", email: "", password: "" });
        setErrors({});
        router.push('/signin')
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false); // কাজ শেষ হলে লোডিং বন্ধ
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden text-white">
      {/* Floating background blobs */}
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse pointer-events-none" />
      <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse pointer-events-none" />

      <Card className="w-full max-w-md border border-white/10 p-6 bg-zinc-900/50 backdrop-blur-md">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r flow-root from-white to-gray-400 bg-clip-text text-transparent">
            Create Account 🚀
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <TextField>
              <Label>Full Name</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <HiUser className="text-gray-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                <InputGroup.Suffix />
              </InputGroup>

              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
              )}
            </TextField>

            {/* EMAIL */}
            <TextField>
              <Label>Email Address</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <HiEnvelope className="text-gray-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

                <InputGroup.Suffix />
              </InputGroup>

              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </TextField>

            {/* PASSWORD */}
            <TextField>
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <HiLockClosed className="text-gray-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />

                <InputGroup.Suffix />
              </InputGroup>

              {errors.password && (
                <p className="text-xs text-red-400 mt-1">{errors.password}</p>
              )}
            </TextField>



            {/* SUBMIT */}
            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold mt-2"
              isLoading={loading}
              isDisabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner color="current" size="sm" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

          </form>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-400 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}