import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, MessageSquare, Database, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for the dashboard
const integrationStats = {
  platforms: {
    slack: { name: 'Slack', connected: true, files: 256, chats: 1024 },
    drive: { name: 'Google Drive', connected: true, files: 512, chats: 0 },
    dropbox: { name: 'Dropbox', connected: false, files: 0, chats: 0 },
    notion: { name: 'Notion', connected: true, files: 128, chats: 256 },
    teams: { name: 'Microsoft Teams', connected: false, files: 0, chats: 0 },
    gchat: { name: 'Google Chat', connected: true, files: 64, chats: 512 },
  },
  totalFiles: 960,
  totalUsers: 24,
  storageUsed: 7.5, // GB
  storageTotal: 20, // GB
  activeUsers: 18,
};

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Workspace Dashboard</h1>
          <div>
            <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Total Files" 
            value={integrationStats.totalFiles.toLocaleString()} 
            description="Files indexed" 
            icon={<FileText className="h-5 w-5 text-weezy-blue" />} 
          />
          <MetricCard 
            title="Storage Used" 
            value={`${integrationStats.storageUsed}GB / ${integrationStats.storageTotal}GB`} 
            description="Storage capacity" 
            icon={<Database className="h-5 w-5 text-weezy-teal" />}
            progress={(integrationStats.storageUsed / integrationStats.storageTotal) * 100} 
          />
          <MetricCard 
            title="Total Users" 
            value={integrationStats.totalUsers.toString()} 
            description={`${integrationStats.activeUsers} active`}
            icon={<Users className="h-5 w-5 text-weezy-blue" />} 
          />
          <MetricCard 
            title="Total Messages" 
            value="1,792" 
            description="From all platforms" 
            icon={<MessageSquare className="h-5 w-5 text-weezy-teal" />} 
          />
        </div>

        <Tabs defaultValue="integrations">
          <TabsList>
            <TabsTrigger value="integrations">Platform Integrations</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="integrations" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.values(integrationStats.platforms).map((platform) => (
                <IntegrationCard key={platform.name} platform={platform} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="activity" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in your workspace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem 
                    name="John Doe" 
                    action="uploaded" 
                    target="Q1 Finance Report.xlsx" 
                    time="2 minutes ago" 
                    platform="Google Drive"
                  />
                  <ActivityItem 
                    name="Jane Smith" 
                    action="sent message in" 
                    target="#general" 
                    time="15 minutes ago" 
                    platform="Slack"
                  />
                  <ActivityItem 
                    name="Tom Lee" 
                    action="updated" 
                    target="Project Timeline" 
                    time="1 hour ago" 
                    platform="Notion"
                  />
                  <ActivityItem 
                    name="Sarah Johnson" 
                    action="shared" 
                    target="Marketing Strategy.pdf" 
                    time="3 hours ago" 
                    platform="Google Drive"
                  />
                  <ActivityItem 
                    name="Mike Chen" 
                    action="created channel" 
                    target="#product-launch" 
                    time="Yesterday" 
                    platform="Slack"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  progress?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon, progress }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {progress !== undefined && (
          <div className="mt-2">
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface IntegrationCardProps {
  platform: {
    name: string;
    connected: boolean;
    files: number;
    chats: number;
  };
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ platform }) => {
  const getPlatformIcon = (name: string) => {
    const iconClass = "h-8 w-8 text-white";
    
    switch (name) {
      case 'Slack':
        return (
          <div className="bg-[#4A154B] p-1.5 rounded">
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>
          </div>
        );
      case 'Google Drive':
      case 'Google Chat':
        return (
          <div className="bg-[#4285F4] p-1.5 rounded">
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19h-2.35l-4.433-11h2.939l3.432 8.713 3.432-8.713h2.939l-5.959 11zm7.218-7.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-3.5 0c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5z"/></svg>
          </div>
        );
      case 'Dropbox':
        return (
          <div className="bg-[#0061FF] p-1.5 rounded">
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M6 1.807l6 3.824-6 3.806-6-3.806 6-3.824zm12 0l6 3.824-6 3.806-6-3.806 6-3.824zm-6 11.895l6-3.807 6 3.807-6 3.806-6-3.806zm-12 0l6-3.807 6 3.807-6 3.806-6-3.806zm6 5.872l6-3.806 6 3.806-6 3.826-6-3.826z"/></svg>
          </div>
        );
      case 'Notion':
        return (
          <div className="bg-[#000000] p-1.5 rounded">
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm1.775 2.22c.746.56.933.466 2.475.42l12.215-.74c.28-.046.327-.14.187-.326l-2.17-2.52c-.374-.42-.934-.653-1.682-.607l-10.5.7c-.234 0-.28.094-.187.234l1.662 2.84zm11.29 1.214l-11.148.653c-.374.047-.42.327-.198.56l-1.775 2.108c-.187.234-.14.56.47.607l12.923.93c.7.047 1.026-.187 1.12-.88l.374-2.52c.093-.42-.327-.606-.84-.653zm.88 6.772c.134-.42-.373-.747-.933-.84l-12.83-1.74c-.28-.047-.653.093-.746.42l-1.682 1.87c-.187.233-.187.513.47.653l14.756 5.12c.28.094.653 0 .84-.233l.41-.56c.234-.313.327-1.167.373-1.634.233-2.055-.046-3.356-.234-3.96z"/></svg>
          </div>
        );
      case 'Microsoft Teams':
        return (
          <div className="bg-[#6264A7] p-1.5 rounded">
            <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M11.919 14.388l3.399-5.812h-3.399v-3.622h7.153v3.622l-3.551 5.812h3.551v3.622h-7.153v-3.622zm-11.919 3.622v-13.644l5.346-2.422v13.644h-5.346v2.422zm5.346-14.773c1.663-.755 3.415-1.511 5.073-2.267.835-.378.919.127.889.889-.1.252-.1.503-.1.755 0 .241.031.483.092.714.1.221.01.442.01.662h.011c.299-.241.598-.483.886-.734 1.454-1.269 2.869-2.539 4.223-3.93.757-.776 1.182-.807 1.969-.073.345.336.7.662 1.057.977.355.336.7.672 1.057.997.777.755.787 1.238.041 2.025-1.386 1.459-2.869 2.802-4.363 4.48-1.874 1.783-3.737 3.576-5.661 5.318-.345.347-.751.347-1.107.01-.146-.157-.282-.325-.418-.493-.648-.766-.648-.766.01-1.511.91-1.029 1.831-2.036 2.741-3.065.683-.777 1.365-1.564 2.044-2.34v-.137h-6.495v5.37c0 .168-.052.336-.147.472-.345.494-.7.977-1.044 1.49-.084.105-.22.168-.355.168-.178.01-.355.01-.533.01h-4.871c-.499 0-.499 0-.499-.493v-2.361z"/></svg>
          </div>
        );
      default:
        return <div className="bg-gray-500 p-1.5 rounded"><FileText className={iconClass} /></div>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{platform.name}</CardTitle>
        {getPlatformIcon(platform.name)}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <div className={`h-3 w-3 rounded-full ${platform.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">{platform.connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="text-lg font-bold">{platform.files.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Files</div>
          </div>
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="text-lg font-bold">{platform.chats.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Messages</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  name: string;
  action: string;
  target: string;
  time: string;
  platform: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ name, action, target, time, platform }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">
            <span className="font-medium">{name}</span>{' '}
            <span className="text-muted-foreground">{action}</span>{' '}
            <span className="font-medium">{target}</span>
          </p>
          <p className="text-xs text-muted-foreground">{platform}</p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  );
};

export default Dashboard;
