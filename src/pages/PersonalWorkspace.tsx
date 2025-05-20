
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { getWorkspaceData } from '@/components/workspace/WorkspaceData';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import WorkspaceQuickActions from '@/components/workspace/WorkspaceQuickActions';
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar';
import WorkspaceContent from '@/components/workspace/WorkspaceContent';

const PersonalWorkspace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceName, setWorkspaceName] = useState('Acme Corporation');
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState<'list' | 'grid'>('list');
  
  // Get workspace data from our data utility
  const { localFiles, cloudFiles, recentFiles } = getWorkspaceData();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Workspace header with navigation and controls */}
        <WorkspaceHeader 
          workspaceName={workspaceName}
          setWorkspaceName={setWorkspaceName}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          view={view}
          setView={setView}
        />

        {/* Quick actions bar */}
        <WorkspaceQuickActions 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar with recent files and tools */}
          <div className="md:col-span-3">
            <WorkspaceSidebar recentFiles={recentFiles} />
          </div>

          {/* Main content area with files and assistant */}
          <div className="md:col-span-9">
            <WorkspaceContent 
              localFiles={localFiles}
              cloudFiles={cloudFiles}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalWorkspace;
