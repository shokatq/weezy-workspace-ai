
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Clock, Edit, Trash, Check, User } from "lucide-react";
import { motion } from "framer-motion";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  progress: number;
  assignedTo: {
    name: string;
    avatar?: string;
    role: string;
  };
  createdBy: {
    name: string;
    avatar?: string;
    role: string;
  };
  private: boolean;
  labels: string[];
}

interface TaskItemProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "from-red-500 to-red-400";
    if (progress < 70) return "from-amber-500 to-amber-400";
    return "from-green-500 to-green-400";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card 
        className={`mb-3 border-l-4 ${task.priority === 'high' ? 'border-l-red-500' : task.priority === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'} hover:shadow-md transition-all duration-200`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-base">{task.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
              </div>
              <div className="flex space-x-1">
                <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
                <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </Badge>
                {task.private && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 bg-slate-100 text-slate-800 border-slate-200">
                    private
                  </Badge>
                )}
              </div>
            </div>

            <div className="pt-1">
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress 
                value={task.progress} 
                className="h-1.5 bg-gray-100" 
                indicatorClassName={`bg-gradient-to-r ${getProgressColor(task.progress)}`}
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {formatDate(task.dueDate)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Due date</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 border border-border">
                          <AvatarImage src={task.assignedTo.avatar} />
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{task.assignedTo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assigned to: {task.assignedTo.name}</p>
                      <p className="text-xs text-muted-foreground">{task.assignedTo.role}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="flex items-center space-x-1"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0" 
                        onClick={() => onEdit(task.id)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit task</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0" 
                        onClick={() => onDelete(task.id)}
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete task</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-7 w-7 p-0 ${task.status === 'completed' ? 'text-green-600' : ''}`} 
                        onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'todo' : 'completed')}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{task.status === 'completed' ? 'Mark as not done' : 'Mark as done'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </div>
            
            {task.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {task.labels.map((label, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-[10px] px-1.5 py-0 bg-gray-50"
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskItem;
