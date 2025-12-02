'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { Label } from './ui/label';

export function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);
  
  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <div className="space-y-4">
        <div>
            <Label>Theme</Label>
            <p className="text-sm text-muted-foreground">Select the theme for the application.</p>
        </div>
        <Button variant="outline" onClick={toggleTheme} className="w-full justify-start">
        {theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
        <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </Button>
    </div>
  );
}
