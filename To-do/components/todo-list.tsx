"use client"

import { useState } from "react"
import { Plus, Trash2, ChevronUp, ChevronDown, CheckCircle2, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Priority = "low" | "medium" | "high"
type Todo = {
  id: number
  text: string
  priority: Priority
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [newPriority, setNewPriority] = useState<Priority>("medium")

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, priority: newPriority, completed: false },
      ])
      setNewTodo("")
      setNewPriority("medium")
    }
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const changePriority = (id: number, direction: "up" | "down") => {
    const priorities: Priority[] = ["low", "medium", "high"]
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const currentIndex = priorities.indexOf(todo.priority)
          const newIndex = direction === "up" ? Math.min(currentIndex + 1, 2) : Math.max(currentIndex - 1, 0)
          return { ...todo, priority: priorities[newIndex] }
        }
        return todo
      })
    )
  }

  const moveTodo = (index: number, direction: "up" | "down") => {
    const newTodos = [...todos]
    const newIndex = direction === "up" ? index - 1 : index + 1

    if (newIndex >= 0 && newIndex < todos.length) {
      [newTodos[index], newTodos[newIndex]] = [newTodos[newIndex], newTodos[index]]
      setTodos(newTodos)
    }
  }

  const priorityColor = (priority: Priority) => {
    switch (priority) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">To-do</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <select
            className="border rounded px-2 py-1"
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-2 rounded ${
                todo.completed ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComplete(todo.id)}
                >
                  <CheckCircle2 className={`h-5 w-5 ${todo.completed ? "text-green-500" : "text-gray-300"}`} />
                </Button>
                <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.text}</span>
                <Badge className={`${priorityColor(todo.priority)} text-white`}>
                  {todo.priority}
                </Badge>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => changePriority(todo.id, "up")}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => changePriority(todo.id, "down")}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => moveTodo(index, "up")} disabled={index === 0}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => moveTodo(index, "down")} disabled={index === todos.length - 1}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeTodo(todo.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          {todos.filter((todo) => !todo.completed).length} tasks remaining
        </p>
      </CardFooter>
    </Card>
  )
}

