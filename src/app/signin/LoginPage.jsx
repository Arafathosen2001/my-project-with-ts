"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Card, Link } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  useEffect(() => {
    const messg = searchParams.get("message");

    if (messg === "login-required") {
      toast.error("Please login first!");
    }
  }, [searchParams]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Invalid email or password.",
        });
      } else {
        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          router.push(redirectTo);
        }, 1200);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
      if (data) {
        toast.success('Google sign-in Successfull')
      }

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Google sign-in failed",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong with Google login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute w-96 h-96 bg-violet-600/20 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      <Card className="w-full max-w-md p-8 border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">


          <h1 className="mt-5 text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-5 text-sm rounded-xl border p-3 ${message.type === "error"
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-green-500/10 border-green-500/20 text-green-400"
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            variant="bordered"
            size="lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="bordered"
            size="lg"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full"
          />

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-violet-400 hover:text-violet-300"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Button
            onClick={() => {
              setFormData({
                email: "demo@example.com",
                password: "Password123!",
              });
            }}
            className="w-full font-semibold rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:scale-[1.02] transition"
          >
            Demo Login
          </Button>
        </form>



        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            href={`/register?redirect=${redirectTo}`}
            className="text-violet-400 font-medium"
          >
            Create account
          </Link>
        </p>
      </Card>
    </div>
  );
}