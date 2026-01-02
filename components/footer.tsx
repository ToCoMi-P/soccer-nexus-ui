'use client';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function ClientFooter() {
  const year = new Date().getFullYear().toString(); 

  return (
    <footer className="border-t bg-background py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <Link href="#" className="flex items-center justify-center gap-1 text-muted-foreground hover:text-foreground text-sm transition-colors">
          <span>&copy; {year}</span>
          <span className="text-primary font-medium">{siteConfig.name}</span>
          <span>All rights reserved.</span>
        </Link>
      </div>
    </footer>
  );
}
