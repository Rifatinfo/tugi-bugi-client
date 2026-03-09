'use client';
import { useState } from "react"

import { motion } from 'framer-motion'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import ShoppingIllustration, { LoginPageProps } from "@/components/modules/Home/Auth/LoginPage";

const  LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const validate = () => {
    const newErrors: {
      email?: string
      password?: string
    } = {}
    if (!email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Enter a valid email'
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      alert('Login successful!')
      onNavigate('home')
    }
  }
  return (
    <div className="min-h-[calc(100vh)] flex flex-col lg:flex-row bg-white">
      {/* Left - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%]">
        <ShoppingIllustration />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 xl:px-20 bg-white">
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="w-full max-w-md"
        >
          {/* Mobile illustration peek */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF5EC] to-[#FFECD2] flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                <rect
                  x="12"
                  y="16"
                  width="24"
                  height="26"
                  rx="3"
                  fill="#E8731A"
                />
                <path
                  d="M19 16V12Q19 6 24 6Q29 6 29 12V16"
                  stroke="#C45A10"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="28" r="4" fill="white" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Sign In
            </h1>
            <p className="text-gray-500">
              Welcome back! Enter your details below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors((p) => ({
                    ...p,
                    email: undefined,
                  }))
                }}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]'}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors((p) => ({
                      ...p,
                      password: undefined,
                    }))
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-11 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-[#E8731A]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-[#E8731A] font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#E8731A] text-white text-sm tracking-wide font-semibold rounded-lg hover:bg-[#d4670f] transition-colors duration-300 mt-1 shadow-lg shadow-[#E8731A]/20"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <button className="w-full py-3 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-[#E8731A] font-semibold hover:underline"
            >
              Create Account
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage;