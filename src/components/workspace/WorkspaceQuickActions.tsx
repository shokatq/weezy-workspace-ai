
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { FileText, Search, Upload, Plus, Calendar, Users, Filter, ChevronDown, Layout, Layers } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  action: () => void;
  dropdown?: {
    label: string;
    icon: React.ElementType;
    action: () => void;
  }[];
}

interface WorkspaceQuickActionsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const WorkspaceQuickActions: React.FC<WorkspaceQuickActionsProps> = ({ searchQuery, setSearchQuery }) => {
  const { toast } = useToast();
  
  const handleFileUpload = () => {
    toast({
      title: "Upload initiated",
      description: "Select files to upload to your workspace",
    });
  };
  
  const quickActions: QuickAction[] = [
    { 
      icon: Plus, 
      label: "New", 
      action: () => {}, 
      dropdown: [
        { label: "Document", icon: FileText, action: () => toast({ title: "Creating new document" }) },
        { label: "Spreadsheet", icon: Layout, action: () => toast({ title: "Creating new spreadsheet" }) },
        { label: "Presentation", icon: Layers, action: () => toast({ title: "Creating new presentation" }) }
      ]
    },
    { icon: Upload, label: "Upload", action: handleFileUpload },
    { icon: Calendar, label: "Schedule", action: () => toast({ title: "Opening calendar" }) },
    { icon: Users, label: "Invite", action: () => toast({ title: "Invite team members" }) },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        {quickActions.map((action, index) => 
          action.dropdown ? (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-card hover:bg-accent transition-colors"
                >
                  <action.icon className="mr-1.5 h-3.5 w-3.5" />
                  {action.label}
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Create new</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {action.dropdown.map((item, idx) => (
                  <DropdownMenuItem key={idx} onClick={item.action}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              key={index}
              variant="outline" 
              size="sm" 
              className="bg-card hover:bg-accent transition-colors"
              onClick={action.action}
            >
              <action.icon className="mr-1.5 h-3.5 w-3.5" />
              {action.label}
            </Button>
          )
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Filter files</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-[7px] h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search workspace..."
            className="pl-8 h-8 w-[200px] lg:w-[280px] text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceQuickActions;
