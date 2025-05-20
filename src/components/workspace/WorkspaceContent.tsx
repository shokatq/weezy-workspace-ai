
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, Bookmark, MoreHorizontal, Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import WorkspaceFileList from './WorkspaceFileList';
import WorkspaceChat from './WorkspaceChat';

interface WorkspaceContentProps {
  localFiles: {
    id: number;
    name: string;
    type: string;
    size: string;
    lastModified: string;
    source: string;
  }[];
  cloudFiles: {
    id: number;
    name: string;
    type: string;
    size: string;
    lastModified: string;
    source: string;
  }[];
}

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({ localFiles, cloudFiles }) => {
  return (
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
  );
};

export default WorkspaceContent;
