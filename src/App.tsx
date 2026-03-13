import { RecipeList } from "./features/recipes/components/RecipeList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <h1 className="text-2xl font-bold px-8 py-6">Recipe Book</h1>
      </header>
      <main className="max-w-6xl mx-auto px-8 py-8">
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
