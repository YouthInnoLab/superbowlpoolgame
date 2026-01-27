"use client"

import { useState } from "react"
import { Grid } from "@/components/Grid"
import { selectCell } from "@/app/actions"
import { Button } from "@/components/ui/button"
import type { GridCell, GameSettings } from "@/lib/data"

interface GameProps {
  initialCells: GridCell[]
  initialSettings: GameSettings
}

export default function Game({ initialCells, initialSettings }: GameProps) {
  const [cells, setCells] = useState(initialCells)
  const [user, setUser] = useState<{id: string, name: string} | null>(null)
  
  // Mock Login State
  const [loginName, setLoginName] = useState("")

  const handleSelect = async (row: number, col: number) => {
    if (!user) {
      alert("Please login first")
      return
    }

    // Optimistic update
    const newCells = [...cells];
    const cellIndex = newCells.findIndex(c => c.row === row && c.col === col);
    if (cellIndex === -1) return;

    // Check limit
    const myCount = newCells.filter(c => c.userId === user.id).length;
    if (myCount >= 5) {
        alert("You can only select up to 5 squares.")
        return;
    }

    const optimisticCell = { ...newCells[cellIndex], userId: user.id, userName: user.name };
    newCells[cellIndex] = optimisticCell;
    setCells(newCells);

    const result = await selectCell(row, col, user.id, user.name)
    if (!result.success) {
      // Revert if failed
      alert(result.error)
      // Ideally we should sync with server state properly, but for now reverting based on initial fetch or re-fetch would be better. 
      // Simplified: just wait for revalidation or keep current state if it matches server eventually.
      // For now, let's just force reload logic or ignoring error handling complexity for mock.
      // Actually, let's revert the local state change.
      const revertCells = [...cells];
      revertCells[cellIndex] = { ...cells[cellIndex] }; // original
      setCells(revertCells);
    } else {
        // Success
    }
  }

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if(loginName.trim()) {
          setUser({ id: loginName.toLowerCase(), name: loginName });
      }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-6xl mx-auto">
      
      {!user ? (
        <div className="card p-6 border rounded-lg shadow-lg bg-card text-card-foreground">
            <h2 className="text-2xl font-bold mb-4">Login to Play</h2>
            <form onSubmit={handleLogin} className="flex gap-2">
                <input 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your name"
                    value={loginName}
                    onChange={e => setLoginName(e.target.value)}
                />
                <Button type="submit">Join Game</Button>
            </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
            <div className="text-lg">
                Welcome, <b>{user.name}</b>! 
                <span className="ml-2 text-muted-foreground">
                    Selected: {cells.filter(c => c.userId === user.id).length}/5
                </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setUser(null)}>Logout</Button>
        </div>
      )}

      <Grid 
        cells={cells}
        rowNumbers={initialSettings.rowNumbers}
        colNumbers={initialSettings.colNumbers}
        teamTop={initialSettings.teamTop}
        teamLeft={initialSettings.teamLeft}
        currentUserId={user?.id}
        onSelect={handleSelect}
      />
    </div>
  )
}
