
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, X, Trash2, UserPlus, Globe, ShieldCheck, Lock } from 'lucide-react';

// Mock data
const integrations = [
  { id: 1, name: 'Slack', connected: true, icon: '/slack.svg' },
  { id: 2, name: 'Google Drive', connected: true, icon: '/google-drive.svg' },
  { id: 3, name: 'Dropbox', connected: false, icon: '/dropbox.svg' },
  { id: 4, name: 'Notion', connected: true, icon: '/notion.svg' },
  { id: 5, name: 'Microsoft Teams', connected: false, icon: '/teams.svg' },
  { id: 6, name: 'Google Chat', connected: true, icon: '/google-chat.svg' }
];

const teamMembers = [
  { id: 1, name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', lastActive: '10 minutes ago' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Member', lastActive: '2 hours ago' },
  { id: 3, name: 'Tom Lee', email: 'tom.lee@company.com', role: 'Member', lastActive: 'Yesterday' },
  { id: 4, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Member', lastActive: '3 days ago' },
  { id: 5, name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Member', lastActive: '1 week ago' },
];

const SettingsPage = () => {
  const [workspaceName, setWorkspaceName] = useState('Acme Corporation');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  
  const handleSaveWorkspace = () => {
    toast({
      title: "Workspace Updated",
      description: "Workspace settings have been saved successfully.",
    });
  };

  const handleIntegrationToggle = (id: number) => {
    toast({
      title: "Integration Updated",
      description: `Integration status has been updated.`,
    });
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail) return;
    
    toast({
      title: "Invitation Sent",
      description: `An invitation email has been sent to ${newMemberEmail}`,
    });
    setNewMemberEmail('');
  };

  const handleRemoveMember = (id: number) => {
    toast({
      title: "Member Removed",
      description: "Team member has been removed from the workspace.",
      variant: "destructive",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="workspace">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="team">Team Management</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          {/* Workspace Settings */}
          <TabsContent value="workspace" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Settings</CardTitle>
                <CardDescription>
                  Manage your workspace details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <Input 
                    id="workspace-name" 
                    value={workspaceName} 
                    onChange={(e) => setWorkspaceName(e.target.value)}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>AI Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow AI to make suggestions based on your content
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>File Indexing</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically index new files for search
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveWorkspace}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border rounded-md p-4 border-destructive/20">
                    <div>
                      <h4 className="font-medium">Delete Workspace</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete this workspace and all of its data
                      </p>
                    </div>
                    <Button variant="destructive">Delete Workspace</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Integrations Tab */}
          <TabsContent value="integrations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Integrations</CardTitle>
                <CardDescription>
                  Connect Weezy to your team's platforms to access and index content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                          {/* Placeholder for actual icons */}
                          <span className="font-semibold">{integration.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <div className="flex items-center mt-1">
                            {integration.connected ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="mr-1 h-3 w-3" /> Connected
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                <X className="mr-1 h-3 w-3" /> Not Connected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant={integration.connected ? "outline" : "default"}
                          onClick={() => handleIntegrationToggle(integration.id)}
                        >
                          {integration.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage access to your workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <form onSubmit={handleAddMember} className="flex items-center space-x-2">
                    <Input
                      placeholder="Email address"
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Select defaultValue="member">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </form>

                  <Separator />
                  
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={member.role === 'Admin' ? "default" : "outline"}>
                            {member.role}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{member.lastActive}</span>
                          {member.role !== 'Admin' && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-muted">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-muted">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Domain Restriction</h4>
                        <p className="text-sm text-muted-foreground">
                          Restrict access to specific email domains
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-muted">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Data Encryption</h4>
                        <p className="text-sm text-muted-foreground">
                          End-to-end encryption for sensitive data
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="password">API Secret Key</Label>
                  <div className="flex space-x-2">
                    <Input value="••••••••••••••••••••••••••••••" disabled />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Used for API access. Keep this key secret.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
