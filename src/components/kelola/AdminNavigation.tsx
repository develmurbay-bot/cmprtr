"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Home, Settings, LogOut, User, KeyRound } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AdminNavigationProps {
  title: string;
  showBackButton?: boolean;
}

export default function AdminNavigation({ title, showBackButton = true }: AdminNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/kelola');
  };

  const handleSettings = () => {
    router.push('/kelola/settings');
  };

  const handleProfile = () => {
    router.push('/kelola/profile');
  };

  const handleChangePassword = () => {
    router.push('/kelola/change-password');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/kelola/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleViewWebsite = () => {
    window.open('/', '_blank');
  };

  const isHomePage = pathname === '/kelola';
  const isSettingsPage = pathname === '/kelola/settings';

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return 'AD';
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && !isHomePage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Button>
          )}
          
          {!isHomePage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleHome}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          )}
          
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewWebsite}
            className="flex items-center space-x-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 font-medium"
          >
            <span>🌐</span>
            <span>Lihat Website</span>
          </Button>
          
          {!isSettingsPage && user?.role === 'admin' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSettings}
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan</span>
            </Button>
          )}
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white text-sm">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.username || 'Admin'}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.role === 'admin' ? 'Administrator' : 'Staff Petugas'}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Ubah Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleChangePassword} className="cursor-pointer">
                <KeyRound className="mr-2 h-4 w-4" />
                <span>Ganti Password</span>
              </DropdownMenuItem>
              {user?.role === 'admin' && (
                <DropdownMenuItem onClick={() => router.push('/kelola/users')} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Kelola User Petugas</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
