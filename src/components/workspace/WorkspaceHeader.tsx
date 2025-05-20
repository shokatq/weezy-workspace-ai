
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Star, Palette, Command, Users, FileText, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface WorkspaceHeaderProps {
  workspaceName: string;
  setWorkspaceName: (name: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  view: 'list' | 'grid';
  setView: (view: 'list' | 'grid') => void;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ 
  workspaceName, 
  setWorkspaceName, 
  isEditing, 
  setIsEditing, 
  view,
  setView
}) => {
  const { toast } = useToast();

  const handleNameChange = () => {
    if (isEditing) {
      toast({
        title: "Workspace renamed",
        description: `Workspace is now named "${workspaceName}"`,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b bg-gradient-to-r from-background to-accent/10 -mx-6 px-6 pt-3">
      <div className="flex items-center">
        {isEditing ? (
          <Input 
            value={workspaceName} 
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="text-xl font-bold h-10 max-w-[300px] bg-background/80"
            autoFocus
            onBlur={handleNameChange}
            onKeyDown={(e) => e.key === 'Enter' && handleNameChange()}
          />
        ) : (
          <div className="flex items-center">
            <h1 
              className="text-xl font-bold cursor-pointer hover:bg-accent/50 px-3 py-1.5 rounded-md transition-colors" 
              onClick={() => setIsEditing(true)}
            >
              <span className="text-primary/80 font-normal">Weezy –</span> {workspaceName}
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-1 text-muted-foreground h-8 w-8">
                    <Star className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Favorite workspace</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Palette className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Customize theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="outline" size="sm" className="hidden md:flex items-center">
          <Command className="h-3.5 w-3.5 mr-1.5" />
          <span className="text-xs">Search</span>
          <Badge variant="outline" className="ml-2 text-[10px] px-1 py-0 font-normal">⌘K</Badge>
        </Button>
        
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger className="text-sm">File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Document <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
              <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
              <MenubarItem>Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Export</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="text-sm">Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
              <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
              <MenubarItem>Copy <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
              <MenubarItem>Paste <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="text-sm">View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setView('list')}>
                List View
                {view === 'list' && <MenubarShortcut>✓</MenubarShortcut>}
              </MenubarItem>
              <MenubarItem onClick={() => setView('grid')}>
                Grid View
                {view === 'grid' && <MenubarShortcut>✓</MenubarShortcut>}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Focus Mode</MenubarItem>
              <MenubarItem>Full Screen <MenubarShortcut>F11</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-8 px-2 text-sm">Share</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-2 w-[220px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Invite Team Members</span>
                      </Button>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Share Current File</span>
                      </Button>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span>Get Public Link</span>
                      </Button>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-primary/70 to-primary text-white">AC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
