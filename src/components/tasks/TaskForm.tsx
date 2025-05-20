
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Task } from './TaskItem';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface TaskFormProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

// Demo users for the select dropdown
const users = [
  { id: '1', name: 'Jane Smith', role: 'Marketing Specialist', avatar: '' },
  { id: '2', name: 'Alex Johnson', role: 'Product Manager', avatar: '' },
  { id: '3', name: 'Mike Chen', role: 'Financial Analyst', avatar: '' },
  { id: '4', name: 'Sarah Williams', role: 'Design Lead', avatar: '' },
];

// Demo labels for suggestions
const suggestedLabels = [
  'marketing', 'design', 'development', 'finance', 'research', 
  'urgent', 'bug', 'feature', 'documentation', 'meeting'
];

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [progress, setProgress] = useState(0);
  const [assignedTo, setAssignedTo] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  
  // Populate form when editing an existing task
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(new Date(task.dueDate));
      setPriority(task.priority);
      setStatus(task.status);
      setProgress(task.progress);
      setAssignedTo(task.assignedTo.name);
      setIsPrivate(task.private);
      setLabels(task.labels);
    }
  }, [task]);

  const handleAddLabel = () => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter(l => l !== label));
  };

  const handleAddSuggestedLabel = (label: string) => {
    if (!labels.includes(label)) {
      setLabels([...labels, label]);
    }
  };

  const handleSave = () => {
    if (!title || !dueDate) return;

    const selectedUser = users.find(u => u.name === assignedTo) || users[0];
    
    const newTask: Task = {
      id: task?.id || '',
      title,
      description,
      dueDate: dueDate.toISOString().split('T')[0],
      priority,
      status,
      progress,
      assignedTo: {
        name: selectedUser.name,
        avatar: selectedUser.avatar,
        role: selectedUser.role
      },
      createdBy: {
        name: 'Current User', // In a real app, this would be the logged-in user
        role: 'Manager',
        avatar: ''
      },
      private: isPrivate,
      labels
    };
    
    onSave(newTask);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>{task ? 'Edit Task' : 'Create New Task'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task details"
              className="min-h-24 w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="due-date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as Task['priority'])}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as Task['status'])}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assigned-to">Assign To</Label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger id="assigned-to">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.name}>
                      <div className="flex items-center">
                        <span>{user.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({user.role})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">Progress ({progress}%)</Label>
            <input
              type="range"
              id="progress"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="private">Private Task</Label>
              <Switch
                id="private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>
            <p className="text-xs text-muted-foreground">Private tasks are only visible to the creator and assigned user</p>
          </div>

          <div className="space-y-3">
            <Label>Labels</Label>
            <div className="flex flex-wrap gap-2 min-h-[36px] p-2 border rounded-md">
              {labels.map(label => (
                <Badge key={label} variant="outline" className="bg-muted/50 gap-1 pr-1">
                  {label}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 ml-1 rounded-full" 
                    onClick={() => handleRemoveLabel(label)}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Add a label"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddLabel();
                  }
                }}
              />
              <Button onClick={handleAddLabel} size="sm">
                Add
              </Button>
            </div>

            <div className="pt-1">
              <p className="text-xs text-muted-foreground mb-2">Suggested labels:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedLabels
                  .filter(label => !labels.includes(label))
                  .map(label => (
                    <Badge 
                      key={label} 
                      variant="outline" 
                      className="cursor-pointer bg-muted/30 hover:bg-muted/50"
                      onClick={() => handleAddSuggestedLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title || !dueDate}>
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskForm;
