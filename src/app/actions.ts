"use server"

import { claimCell, getGameSettings, getGridCells, updateSettings as updateSettingsData, GridCell, GameSettings } from "@/lib/data"
import { revalidatePath } from "next/cache"

export async function fetchGameData() {
    const settings = await getGameSettings()
    const cells = await getGridCells()
    return { settings, cells }
}

export async function selectCell(row: number, col: number, userId: string, userName: string) {
    try {
        const cell = await claimCell(row, col, userId, userName)

        // Check count for email logic (in real app, this would be an async job or event)
        // User asked for "Send email to user as notification after they choose the grids"
        console.log(`[MOCK EMAIL] To: ${userName}@example.com | Subject: Selection Confirmed | Grid: (${row}, ${col})`)

        revalidatePath("/")
        return { success: true, cell }
    } catch (error) {
        return { success: false, error: (error as Error).message }
    }
}

export async function updateGameSettings(settings: Partial<GameSettings>) {
    await updateSettingsData(settings)
    revalidatePath("/")
    return { success: true }
}
