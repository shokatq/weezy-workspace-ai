
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import WorkspaceFileList from '@/components/workspace/WorkspaceFileList';
import WorkspaceChat from '@/components/workspace/WorkspaceChat';
import { 
  FileText, MessageSquare, Search, Upload, Download, Plus, Calendar, 
  Star, Clock, Settings, Users, Bookmark, MoreHorizontal, Filter,
  ChevronDown, ExternalLink, Layout, Layers, Command, Palette
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const PersonalWorkspace = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceName, setWorkspaceName] = useState('Acme Corporation');
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState<'list' | 'grid'>('list');
  
  // Mock data for workspace files
  const localFiles = [
    { id: 1, name: 'Project Roadmap.docx', type: 'document', size: '245 KB', lastModified: '2 hours ago', source: 'Local' },
    { id: 2, name: 'Budget Forecast 2025.xlsx', type: 'spreadsheet', size: '1.2 MB', lastModified: '1 day ago', source: 'Local' },
    { id: 3, name: 'Team Meeting Notes.md', type: 'document', size: '32 KB', lastModified: '3 days ago', source: 'Local' },
  ];
  
  const cloudFiles = [
    { id: 4, name: 'Marketing Strategy.pdf', type: 'pdf', size: '3.7 MB', lastModified: '5 hours ago', source: 'Google Drive' },
    { id: 5, name: 'Sales Presentation.pptx', type: 'presentation', size: '5.1 MB', lastModified: '1 week ago', source: 'Dropbox' },
    { id: 6, name: 'Customer Survey Results.csv', type: 'data', size: '852 KB', lastModified: '2 days ago', source: 'OneDrive' },
  ];

  const recentFiles = [...localFiles, ...cloudFiles].sort((a, b) => {
    // Simple sorting by "hours" vs "days" vs "weeks"
    const getTimeValue = (str: string) => {
      if (str.includes('hour')) return 0;
      if (str.includes('day')) return 1;
      if (str.includes('week')) return 2;
      return 3;
    };
    return getTimeValue(a.lastModified) - getTimeValue(b.lastModified);
  }).slice(0, 3);

  const handleFileUpload = () => {
    toast({
      title: "Upload initiated",
      description: "Select files to upload to your workspace",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your file is being downloaded",
    });
  };

  const handleNameChange = () => {
    if (isEditing) {
      toast({
        title: "Workspace renamed",
        description: `Workspace is now named "${workspaceName}"`,
      });
    }
    setIsEditing(!isEditing);
  };

  const quickActions = [
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
    <MainLayout>
      <div className="space-y-6">
        {/* Top navigation bar with modern design */}
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

        {/* Quick actions bar with dropdowns */}
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar with improved visuals */}
          <div className="md:col-span-3">
            <div className="space-y-6">
              {/* Recent files with improved visuals */}
              <Card className="overflow-hidden shadow-sm border-muted/60">
                <CardHeader className="py-3 px-4 bg-accent/20 border-b border-border/50">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary/70" />
                      Recent Files
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-background/80">
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 py-1">
                  <WorkspaceFileList files={recentFiles} />
                </CardContent>
              </Card>
              
              {/* Workspace tools with better styling */}
              <Card className="overflow-hidden shadow-sm border-muted/60">
                <CardHeader className="py-3 px-4 bg-accent/20 border-b border-border/50">
                  <CardTitle className="text-base flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-primary/70" />
                    Workspace Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 py-3 space-y-2.5">
                  <Button variant="outline" className="w-full justify-start text-sm h-9 bg-background/50 hover:bg-accent/60" onClick={handleFileUpload}>
                    <Upload className="mr-2 h-4 w-4 text-primary/70" />
                    Import Files
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm h-9 bg-background/50 hover:bg-accent/60" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4 text-primary/70" />
                    Export Files
                  </Button>
                </CardContent>
                <CardFooter className="px-4 py-3 border-t">
                  <div className="text-xs text-muted-foreground w-full">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-medium">Storage</span>
                      <span>3.5GB / 10GB</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/80 to-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Main content area with improved visuals */}
          <div className="md:col-span-9">
            <Card className="overflow-hidden border-muted/60 shadow-sm h-full">
              <CardContent className="p-0">
                <Tabs defaultValue="files" className="w-full">
                  <div className="flex items-center justify-between border-b bg-accent/10 px-4">
                    <TabsList className="bg-transparent h-12">
                      <TabsTrigger 
                        value="files" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 h-full"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Files
                      </TabsTrigger>
                      <TabsTrigger 
                        value="assistant" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 h-full"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        AI Assistant
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-sm">
                              <Bookmark className="h-4 w-4 mr-1.5" />
                              Favorites
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View bookmarked items</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Refresh</DropdownMenuItem>
                          <DropdownMenuItem>Sort by name</DropdownMenuItem>
                          <DropdownMenuItem>Sort by date</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View settings</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <TabsContent value="files" className="p-0 m-0">
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="flex items-center">
                            <div className="w-1.5 h-6 bg-emerald-500 rounded-sm mr-2.5"></div>
                            Local Files
                          </span>
                          <Button variant="ghost" size="icon" className="h-7 w-7 ml-2 hover:bg-accent/60">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </h3>
                        <Card className="overflow-hidden shadow-sm border-muted/60">
                          <CardContent className="p-0">
                            <WorkspaceFileList files={localFiles} />
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <span className="flex items-center">
                            <div className="w-1.5 h-6 bg-blue-500 rounded-sm mr-2.5"></div>
                            Cloud Files
                          </span>
                          <Button variant="ghost" size="icon" className="h-7 w-7 ml-2 hover:bg-accent/60">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </h3>
                        <Card className="overflow-hidden shadow-sm border-muted/60">
                          <CardContent className="p-0">
                            <WorkspaceFileList files={cloudFiles} />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="assistant" className="p-0 m-0">
                    <Card className="border-none shadow-none h-[600px]">
                      <CardContent className="p-0 h-full">
                        <WorkspaceChat />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalWorkspace;
