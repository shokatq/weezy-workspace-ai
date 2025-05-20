
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Plus, Search, List } from "lucide-react";
import TaskItem, { Task } from './TaskItem';
import TaskForm from './TaskForm';

// Sample data for tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Q2 Marketing Strategy Document',
    description: 'Finalize the marketing strategy document for Q2 with focus on new product launch and social media campaigns.',
    dueDate: '2025-07-15',
    priority: 'high',
    status: 'in-progress',
    progress: 65,
    assignedTo: {
      name: 'Jane Smith',
      role: 'Marketing Specialist'
    },
    createdBy: {
      name: 'John Doe',
      role: 'Marketing Director'
    },
    private: true,
    labels: ['marketing', 'strategy', 'Q2']
  },
  {
    id: '2',
    title: 'Review Website Redesign Mockups',
    description: 'Review and provide feedback on the new website design mockups from the design team.',
    dueDate: '2025-06-30',
    priority: 'medium',
    status: 'todo',
    progress: 0,
    assignedTo: {
      name: 'Alex Johnson',
      role: 'Product Manager'
    },
    createdBy: {
      name: 'Sarah Williams',
      role: 'Design Lead'
    },
    private: false,
    labels: ['design', 'website', 'review']
  },
  {
    id: '3',
    title: 'Prepare Financial Reports for Board Meeting',
    description: 'Compile and prepare all financial reports required for the upcoming quarterly board meeting.',
    dueDate: '2025-07-05',
    priority: 'high',
    status: 'review',
    progress: 85,
    assignedTo: {
      name: 'Mike Chen',
      role: 'Financial Analyst'
    },
    createdBy: {
      name: 'Robert Brown',
      role: 'CFO'
    },
    private: true,
    labels: ['financial', 'reports', 'board']
  }
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter tasks based on status and search query
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleEdit = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowTaskForm(true);
    }
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status, progress: status === 'completed' ? 100 : t.progress } : t
    ));
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      // Add new task
      setTasks([...tasks, {...task, id: Date.now().toString()}]);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-4">
      {!showTaskForm ? (
        <div>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 h-9">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button onClick={() => setShowTaskForm(true)} className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Task</span>
                </Button>
              </motion.div>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4 bg-muted/40 p-0.5 h-9">
              <TabsTrigger value="list" className="flex gap-1.5">
                <List className="h-4 w-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="board" className="flex gap-1.5">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Board View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-1 mt-0">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <div className="rounded-full bg-muted p-3">
                      <List className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      {searchQuery ? "No tasks match your search criteria." : "You haven't created any tasks yet."}
                    </p>
                    {!searchQuery && (
                      <Button onClick={() => setShowTaskForm(true)} className="mt-4">
                        <Plus className="mr-1 h-4 w-4" /> Create your first task
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="board" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['todo', 'in-progress', 'review', 'completed'].map((status) => (
                  <Card key={status} className="h-full">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">
                        {status === 'todo' && 'To Do'}
                        {status === 'in-progress' && 'In Progress'}
                        {status === 'review' && 'In Review'}
                        {status === 'completed' && 'Completed'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 py-0">
                      <div className="space-y-3 max-h-[400px] overflow-y-auto p-1">
                        {filteredTasks
                          .filter(task => task.status === status)
                          .map(task => (
                            <TaskItem 
                              key={task.id} 
                              task={task} 
                              onEdit={handleEdit} 
                              onDelete={handleDelete}
                              onStatusChange={handleStatusChange}
                            />
                          ))
                        }
                        {filteredTasks.filter(task => task.status === status).length === 0 && (
                          <div className="h-24 flex items-center justify-center border border-dashed rounded-md">
                            <p className="text-xs text-muted-foreground">No tasks</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <TaskForm 
          task={editingTask} 
          onSave={handleSaveTask} 
          onCancel={closeTaskForm} 
        />
      )}
    </div>
  );
};

export default TaskList;
