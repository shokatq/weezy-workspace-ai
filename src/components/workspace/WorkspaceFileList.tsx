
import React, { useState } from 'react';
import { FileText, FileSpreadsheet, FileCode, FileImage, File, Plus, MoreHorizontal, Star, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

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
  const [starredFiles, setStarredFiles] = useState<number[]>([]);

  const toggleStarred = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (starredFiles.includes(id)) {
      setStarredFiles(starredFiles.filter(fileId => fileId !== id));
    } else {
      setStarredFiles([...starredFiles, id]);
    }
  };

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
      case 'presentation':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'data':
        return <FileCode className="h-4 w-4 text-cyan-600" />;
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
      case 'Local':
        return 'bg-emerald-100 text-emerald-800';
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
      case 'presentation':
        return 'bg-orange-50';
      case 'data':
        return 'bg-cyan-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 px-2">
        <div className="flex items-center justify-between py-2 mb-2">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 opacity-70" />
            Files
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-accent transition-colors">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Add new file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {files.map((file) => (
          <div 
            key={file.id} 
            className={cn(
              "group flex items-center justify-between rounded-md px-3 py-2 transition-all hover:bg-accent/40 cursor-pointer border border-transparent",
              hoveredFileId === file.id && "bg-accent/40 shadow-sm",
              "hover:border-accent/60"
            )}
            onMouseEnter={() => setHoveredFileId(file.id)}
            onMouseLeave={() => setHoveredFileId(null)}
          >
            <div className="flex items-center flex-1 min-w-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-6 w-6 mr-1.5 p-0", 
                  starredFiles.includes(file.id) ? "text-amber-400" : "text-transparent group-hover:text-muted-foreground/40"
                )}
                onClick={(e) => toggleStarred(file.id, e)}
              >
                <Star className="h-3.5 w-3.5" />
              </Button>
              
              <div className={cn("p-1.5 rounded mr-3", getFileTypeColor(file.type))}>
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="truncate">{file.size}</span>
                  <span>•</span>
                  <span className="truncate flex items-center">
                    <Clock className="h-3 w-3 mr-1 opacity-70" />
                    {file.lastModified}
                  </span>
                  <Badge variant="outline" className={cn("px-1.5 py-0 text-[10px] font-medium", getSourceColor(file.source))}>
                    {file.source}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className={cn("opacity-0 group-hover:opacity-100 transition-opacity flex items-center", 
              hoveredFileId === file.id && "opacity-100")}>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 mr-0.5">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Open in new tab</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    {starredFiles.includes(file.id) ? "Remove from favorites" : "Add to favorites"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        {files.length === 0 && (
          <div className="text-center py-8 rounded-lg border border-dashed border-muted my-4">
            <div className="flex flex-col items-center p-4 space-y-3">
              <div className="rounded-full bg-muted p-3">
                <File className="h-6 w-6 text-muted-foreground opacity-40" />
              </div>
              <h3 className="text-sm font-medium">No files found</h3>
              <p className="text-xs text-muted-foreground max-w-[220px]">
                Upload a file or connect to cloud storage to access your documents
              </p>
              <Button size="sm" variant="outline" className="mt-2">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
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
