import { ChefHat } from "lucide-react"
export function Header() {
    return (
        <header className="flex gap-3 items-center justify-center p-10 border-b-2">
            <div className="bg-[#d17557] p-4 rounded-4xl">
                <ChefHat size={70} color="white" />
            </div>
            <div className="text-center">
                <h1 className="text-2xl text-[#d17557] font-semibold"> Recipe Generator</h1>
                <p className="text-sm text-gray-600">Discover recipe from AI</p>
            </div>
        </header>
    )
}