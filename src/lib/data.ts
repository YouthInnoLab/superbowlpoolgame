
export type GridCell = {
    id: string;
    row: number;
    col: number;
    userId: string | null;
    userName?: string | null;
    isPaid: boolean;
};

export type GameSettings = {
    teamTop: string;
    teamLeft: string;
    rowNumbers: number[];
    colNumbers: number[];
    isLocked: boolean;
};

// Use globalThis to persist state across Hot Module Reloads in development
const globalStore = globalThis as unknown as {
    mockSettings: GameSettings;
    mockCells: GridCell[];
};

if (!globalStore.mockSettings) {
    globalStore.mockSettings = {
        teamTop: "Team A",
        teamLeft: "Team B",
        rowNumbers: Array.from({ length: 10 }, (_, i) => i),
        colNumbers: Array.from({ length: 10 }, (_, i) => i),
        isLocked: false,
    };
}

if (!globalStore.mockCells) {
    globalStore.mockCells = [];
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            globalStore.mockCells.push({
                id: `${r}-${c}`,
                row: r,
                col: c,
                userId: null,
                isPaid: false,
            });
        }
    }
}

export async function getGameSettings() {
    return globalStore.mockSettings;
}

export async function getGridCells() {
    return globalStore.mockCells;
}

export async function claimCell(row: number, col: number, userId: string, userName: string) {
    if (globalStore.mockSettings.isLocked) throw new Error("Game is locked");

    const cell = globalStore.mockCells.find((c) => c.row === row && c.col === col);
    if (!cell) throw new Error("Cell not found");
    if (cell.userId) throw new Error("Cell already taken");

    // Check user limit (mock check)
    const userCount = globalStore.mockCells.filter(c => c.userId === userId).length;
    if (userCount >= 5) throw new Error("User limit reached");

    cell.userId = userId;
    cell.userName = userName;

    // Check if grid is full
    if (globalStore.mockCells.every(c => c.userId)) {
        globalStore.mockSettings.isLocked = true;
    }

    return cell;
}

export async function updateSettings(newSettings: Partial<GameSettings>) {
    globalStore.mockSettings = { ...globalStore.mockSettings, ...newSettings };
    return globalStore.mockSettings;
}
