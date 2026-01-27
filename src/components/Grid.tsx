"use client"

import { cn, stringToColor } from "@/lib/utils"

type GridCell = {
  id: string
  row: number
  col: number
  userId: string | null
  userName?: string | null
  isPaid: boolean
}

interface GridProps {
  cells: GridCell[]
  rowNumbers: number[]
  colNumbers: number[]
  teamTop: string
  teamLeft: string
  currentUserId?: string
  onSelect: (row: number, col: number) => void
}

export function Grid({ cells, rowNumbers, colNumbers, teamTop, teamLeft, currentUserId, onSelect }: GridProps) {
  const getCell = (r: number, c: number) => cells.find(cell => cell.row === r && cell.col === c)

  return (
    <div className="flex justify-center p-4 overflow-auto">
      <div className="inline-grid grid-cols-[auto_auto_auto] gap-2">
        
        {/* Row 1: Team Top Header */}
        <div className="col-start-3 flex items-center justify-center font-bold text-xl text-primary p-2 bg-blue-100 dark:bg-blue-900 rounded shadow-sm">
          {teamTop}
        </div>

        {/* Row 2: Column Headers */}
        <div className="col-start-3 grid grid-cols-10 gap-1">
            {colNumbers.map((num, i) => (
                <div key={`col-header-${i}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold bg-muted rounded shadow-sm">
                    {num}
                </div>
            ))}
        </div>

        {/* Row 3: Main Content Area */}
        
        {/* Col 1: Team Left (Vertical) */}
        <div className="row-start-3 col-start-1 flex items-center justify-center font-bold text-xl text-primary p-2 bg-red-100 dark:bg-red-900 rounded shadow-sm writing-mode-vertical [writing-mode:vertical-lr] rotate-180">
            {teamLeft}
        </div>

        {/* Col 2: Row Headers */}
        <div className="row-start-3 col-start-2 grid grid-rows-10 gap-1">
            {rowNumbers.map((num, i) => (
                <div key={`row-header-${i}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold bg-muted rounded shadow-sm">
                    {num}
                </div>
            ))}
        </div>

        {/* Col 3: The Grid */}
        <div className="row-start-3 col-start-3 grid grid-cols-10 grid-rows-10 gap-1">
            {Array.from({ length: 10 }).map((_, r) => (
                Array.from({ length: 10 }).map((_, c) => {
                    const cell = getCell(r, c)
                    const isTaken = !!cell?.userId
                    const isMine = cell?.userId === currentUserId
                    
                    const cellColor = isTaken && cell?.userId ? stringToColor(cell.userId) : undefined;

                    return (
                        <button
                            key={`${r}-${c}`}
                            onClick={() => !isTaken && onSelect(r, c)}
                            disabled={isTaken}
                            style={{ backgroundColor: cellColor }}
                            className={cn(
                                "w-8 h-8 sm:w-10 sm:h-10 border rounded flex items-center justify-center text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-sm text-white font-medium",
                                isTaken ? "cursor-not-allowed border-transparent" : "bg-card hover:bg-accent cursor-pointer border-input text-foreground",
                                isMine && "ring-4 ring-green-400 z-10",
                                !isTaken && !isMine && "hover:border-primary"
                            )}
                            title={cell?.userName || "Available"}
                        >
                            {isTaken ? (cell?.userName?.slice(0, 2).toUpperCase() || "X") : ""}
                        </button>
                    )
                })
            ))}
        </div>

      </div>
    </div>
  )
}
