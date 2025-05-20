
import React, { useState } from 'react';
import { FileText, FileSpreadsheet, FileCode, FileImage, File, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  source: string;
}

interface WorkspaceFileListProps {
  files: FileItem[];
}

const WorkspaceFileList: React.FC<WorkspaceFileListProps> = ({ files }) => {
  const [hoveredFileId, setHoveredFileId] = useState<number | null>(null);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'code':
        return <FileCode className="h-4 w-4 text-purple-600" />;
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'image':
        return <FileImage className="h-4 w-4 text-amber-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Google Drive':
        return 'bg-blue-100 text-blue-800';
      case 'Dropbox':
        return 'bg-indigo-100 text-indigo-800';
      case 'OneDrive':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'document':
        return 'bg-blue-50';
      case 'spreadsheet':
        return 'bg-green-50';
      case 'code':
        return 'bg-purple-50';
      case 'pdf':
        return 'bg-red-50';
      case 'image':
        return 'bg-amber-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 px-1">
        <div className="flex items-center justify-between py-2 mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">Files</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {files.map((file) => (
          <div 
            key={file.id} 
            className={cn(
              "group flex items-center justify-between rounded-md px-2 py-1.5 transition-colors hover:bg-accent cursor-pointer",
              hoveredFileId === file.id && "bg-accent"
            )}
            onMouseEnter={() => setHoveredFileId(file.id)}
            onMouseLeave={() => setHoveredFileId(null)}
          >
            <div className="flex items-center flex-1 min-w-0">
              <div className={cn("p-1.5 rounded mr-2", getFileTypeColor(file.type))}>
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="truncate">{file.size}</span>
                  <span>•</span>
                  <span className="truncate">{file.lastModified}</span>
                  <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-medium", getSourceColor(file.source))}>
                    {file.source}
                  </span>
                </div>
              </div>
            </div>
            <div className={cn("opacity-0 group-hover:opacity-100 transition-opacity", hoveredFileId === file.id && "opacity-100")}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Open</DropdownMenuItem>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        {files.length === 0 && (
          <div className="text-center py-6 rounded-lg border border-dashed border-muted my-4">
            <div className="flex flex-col items-center p-4 space-y-2">
              <File className="h-8 w-8 text-muted-foreground opacity-40" />
              <h3 className="text-sm font-medium">No files found</h3>
              <p className="text-xs text-muted-foreground">Upload a file or connect to cloud storage</p>
              <Button size="sm" variant="outline" className="mt-2">
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add file
              </Button>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default WorkspaceFileList;
