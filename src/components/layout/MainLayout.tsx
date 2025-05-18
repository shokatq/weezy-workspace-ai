
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';
import { Settings, User, MessageSquare, Database, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const Header = () => {
  const { toast } = useToast();

  const handleNotification = () => {
    toast({
      title: "Notification",
      description: "You have no new notifications",
    });
  };

  return (
    <header className="border-b border-border h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Weezy</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleNotification}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </Button>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-blue flex items-center justify-center">
            <span className="font-bold text-white text-sm">W</span>
          </div>
          <span className="font-semibold text-lg">Weezy</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-2">
            <nav className="space-y-1">
              <SidebarItem to="/" icon={<FileText size={20} />} label="Dashboard" />
              <SidebarItem to="/workspace" icon={<User size={20} />} label="Personal Workspace" />
              <SidebarItem to="/chat" icon={<MessageSquare size={20} />} label="Chat" />
              <SidebarItem to="/storage" icon={<Database size={20} />} label="Storage" />
              <SidebarItem to="/settings" icon={<Settings size={20} />} label="Settings" />
            </nav>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default MainLayout;
