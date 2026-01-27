"use client"

import { useState } from "react"
import { updateGameSettings, fetchGameData } from "@/app/actions"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState("")

  const [teamTop, setTeamTop] = useState("")
  const [teamLeft, setTeamLeft] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setIsAdmin(true)
    } else {
      alert("Invalid password")
    }
  }

  const handleUpdateTeams = async () => {
    setLoading(true)
    await updateGameSettings({
      teamTop: teamTop || undefined,
      teamLeft: teamLeft || undefined,
    })
    setLoading(false)
    alert("Teams updated!")
  }

  const handleRandomize = async () => {
    if (!confirm("This will randomize row and column numbers. Continue?")) return
    
    const shuffle = (array: number[]) => array.sort(() => Math.random() - 0.5)
    
    await updateGameSettings({
      rowNumbers: shuffle([0,1,2,3,4,5,6,7,8,9]),
      colNumbers: shuffle([0,1,2,3,4,5,6,7,8,9]),
    })
    alert("Numbers randomized!")
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleLogin} className="flex gap-2 p-4 border rounded shadow">
          <input 
            type="password" 
            placeholder="Admin Password" 
            className="border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-8">
        <div className="p-6 border rounded shadow-sm bg-card">
          <h2 className="text-xl font-semibold mb-4">Team Names</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Top Team</label>
              <input 
                className="w-full border p-2 rounded"
                placeholder="Currently: Mock Team A"
                value={teamTop}
                onChange={e => setTeamTop(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Left Team</label>
              <input 
                className="w-full border p-2 rounded"
                placeholder="Currently: Mock Team B"
                value={teamLeft}
                onChange={e => setTeamLeft(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateTeams} disabled={loading}>
              Update Teams
            </Button>
          </div>
        </div>

        <div className="p-6 border rounded shadow-sm bg-card">
          <h2 className="text-xl font-semibold mb-4">Grid Numbers</h2>
          <p className="text-sm text-gray-500 mb-4">
            Randomize the row and column numbers (0-9). This usually happens after grid is full.
          </p>
          <Button onClick={handleRandomize} variant="secondary">
            Randomize Numbers
          </Button>
        </div>
        
        <div className="p-6 border rounded shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
             <Button variant="outline" onClick={() => setIsAdmin(false)}>Logout</Button>
             <Button className="ml-2" variant="link" onClick={() => window.location.href = "/"}>Go to Game</Button>
        </div>
      </div>
    </div>
  )
}
