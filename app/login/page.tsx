"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Lock, Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Mode = "login" | "register" | "forgot"

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("login")
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const resetState = () => {
    setErrorMsg(null)
    setSuccessMsg(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    resetState()

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMsg(error.message)
      } else {
        router.push("/")
        router.refresh()
      }
    } else if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setErrorMsg(error.message)
      } else {
        setSuccessMsg("Pendaftaran berhasil! Cek email kamu untuk verifikasi akun.")
      }
    } else if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      })

      if (error) {
        setErrorMsg(error.message)
      } else {
        setSuccessMsg("Tautan instruksi reset password telah dikirim ke email kamu.")
      }
    }

    setLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-100 overflow-hidden">
      {/* Background Animasi */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-[30%] -left-[25%] w-[150%] h-[80%] bg-zinc-900 rounded-t-[50%] animate-in slide-in-from-bottom-[100%] duration-[1500ms] ease-out"></div>
      </div>

      {/* Card Form */}
      <Card className="relative z-10 w-full max-w-md shadow-2xl border-none bg-white/95 backdrop-blur-md animate-in fade-in zoom-in-95 duration-700">
        <CardHeader className="space-y-2 text-center pb-6 pt-6">
          {mode !== "login" && (
            <button
              onClick={() => {
                setMode("login")
                resetState()
              }}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3 w-3" /> Kembali ke Login
            </button>
          )}

          <CardTitle className="text-3xl font-bold tracking-tight text-zinc-900">
            {mode === "login" && "Sign In"}
            {mode === "register" && "Buat Akun Baru"}
            {mode === "forgot" && "Reset Password"}
          </CardTitle>

          <CardDescription className="text-zinc-500">
            {mode === "login" && "Akses aman menuju DevMetrics Dashboard"}
            {mode === "register" && "Daftarkan email kamu untuk mendapatkan akses dashboard"}
            {mode === "forgot" && "Masukkan email kamu untuk menerima tautan pemulihan"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Alert Error */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Alert Sukses */}
            {successMsg && (
              <div className="flex items-center gap-2 p-3 text-sm text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Input Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="developer@domain.com"
                  className="pl-10 h-11 border-zinc-200 focus-visible:ring-zinc-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input Password (Khusus Login & Register) */}
            {mode !== "forgot" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-700">Password</Label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot")
                        resetState()
                      }}
                      className="text-xs text-zinc-500 hover:text-zinc-900 font-medium transition-colors cursor-pointer"
                    >
                      Lupa Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 border-zinc-200 focus-visible:ring-zinc-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6 pb-8">
            <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-md h-11 cursor-pointer transition-all" type="submit" disabled={loading}>
              {loading ? "Memproses..." : mode === "login" ? "Sign In" : mode === "register" ? "Daftar Akun" : "Kirim Tautan Reset"}
            </Button>

            {/* Switch Mode Navigasi Bawah */}
            <div className="text-center text-sm text-zinc-500">
              {mode === "login" ? (
                <span>
                  Belum punya akses?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register")
                      resetState()
                    }}
                    className="text-zinc-900 font-semibold hover:underline cursor-pointer"
                  >
                    Daftar di sini
                  </button>
                </span>
              ) : mode === "register" ? (
                <span>
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login")
                      resetState()
                    }}
                    className="text-zinc-900 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              ) : null}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}