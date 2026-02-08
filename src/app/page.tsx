import { fetchGameData } from "@/app/actions"
import Game from "@/components/Game"

export default async function Home() {
  const { cells, settings } = await fetchGameData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 pb-24 px-4 bg-gradient-to-b from-background to-muted">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center text-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-400 dark:to-red-400 drop-shadow-sm">
          Superbowl Pool Game
        </h1>
        <p className="text-muted-foreground text-lg">
          Select your squares and enjoy the game!
        </p>
      </div>

      <div className="my-8 w-full">
        <Game initialCells={cells} initialSettings={settings} />
      </div>
      
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
         {/* Footer or rules could go here */}
      </div>
    </main>
  )
}
