import { TodoList } from "@/components/todo-list"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <TodoList />
    </main>
  )
}

