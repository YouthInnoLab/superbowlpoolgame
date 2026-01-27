import { fetchGameData } from "@/app/actions"
import Game from "@/components/Game"

export default async function Home() {
  const { cells, settings } = await fetchGameData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24 bg-gradient-to-b from-background to-muted">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Superbowl Pool Game
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
