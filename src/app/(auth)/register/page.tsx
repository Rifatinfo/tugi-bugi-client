'use client';
import { useState } from "react"


import { motion } from 'framer-motion'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import RegisterIllustration, { RegisterPageProps } from "@/components/modules/Home/Auth/RegisterPage";

const RegisterPage = ({ onNavigate }: RegisterPageProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }))
  }
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required'
    if (!form.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Enter a valid email'
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 6)
      newErrors.password = 'Must be at least 6 characters'
    if (!form.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      alert('Account created successfully!')
      onNavigate('login')
    }
  }
  const fields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      value: form.name,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'you@example.com',
      value: form.email,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      value: form.password,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      value: form.confirmPassword,
    },
  ]
  return (
    <div className="min-h-[calc(100vh)] flex flex-col lg:flex-row bg-white">
      {/* Left - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%]">
        <RegisterIllustration />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-12 xl:px-20 bg-white">
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
          {/* Mobile icon */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF5EC] to-[#FFECD2] flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                <ellipse
                  cx="24"
                  cy="16"
                  rx="8"
                  ry="9"
                  fill="#E8731A"
                  opacity="0.8"
                />
                <path
                  d="M14 24 Q14 32 10 42 L38 42 Q34 32 34 24 Z"
                  fill="#F5923A"
                />
                <rect
                  x="20"
                  y="42"
                  width="8"
                  height="3"
                  rx="1.5"
                  fill="#C45A10"
                />
              </svg>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">
              Join Aarong for an exclusive experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={`reg-${field.id}`}
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={`reg-${field.id}`}
                    type={
                      field.type === 'password'
                        ? showPassword
                          ? 'text'
                          : 'password'
                        : field.type
                    }
                    value={field.value}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${errors[field.id] ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#E8731A]/20 focus:border-[#E8731A]'} ${field.type === 'password' ? 'pr-11' : ''}`}
                  />
                  {field.id === 'password' && (
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
                  )}
                </div>
                {errors[field.id] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <label className="flex items-start gap-2.5 cursor-pointer mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#E8731A] mt-0.5"
              />
              <span className="text-sm text-gray-600 leading-snug">
                I agree to the{' '}
                <a
                  href="#"
                  className="text-[#E8731A] font-medium hover:underline"
                >
                  Terms
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="text-[#E8731A] font-medium hover:underline"
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#E8731A] text-white text-sm tracking-wide font-semibold rounded-lg hover:bg-[#d4670f] transition-colors duration-300 mt-1 shadow-lg shadow-[#E8731A]/20"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

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

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#E8731A] font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
export default RegisterPage;


