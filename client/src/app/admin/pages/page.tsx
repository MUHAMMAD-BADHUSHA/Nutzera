'use client';

import { useRouter } from 'next/navigation';
import { FileText, ArrowRight, Settings, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PermissionGuard } from '@/components/admin/PermissionGuard';

const pages = [
  {
    title: 'About Us',
    slug: 'about',
    description: 'Tell your brand story, mission, vision, and values',
    href: '/admin/pages/about',
    icon: FileText,
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    description: 'Data collection, cookies, and user privacy information',
    href: '/admin/pages/privacy',
    icon: Settings,
  },
  {
    title: 'Terms & Conditions',
    slug: 'terms-and-conditions',
    description: 'Terms of service, returns, and legal information',
    href: '/admin/pages/terms',
    icon: FileText,
  },
  {
    title: 'Contact Us',
    slug: 'contact',
    description: 'Contact information, form settings, and map embed',
    href: '/admin/pages/contact',
    icon: Mail,
  },
];

export default function AdminPagesPage() {
  const router = useRouter();

  return (
    <PermissionGuard permission="settings.view">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your website&apos;s static pages
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pages.map((page) => (
            <Card
              key={page.slug}
              className="cursor-pointer hover:shadow-md transition-shadow group"
              onClick={() => router.push(page.href)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                        <page.icon size={20} className="text-[#10B981]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#10B981] transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-xs text-gray-400">/{page.slug}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-[52px]">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-gray-300 group-hover:text-[#10B981] transition-colors mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PermissionGuard>
  );
}
