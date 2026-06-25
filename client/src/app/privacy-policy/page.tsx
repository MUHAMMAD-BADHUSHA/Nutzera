'use client';

import { usePageBySlug } from '@/hooks/usePages';
import { PageBanner } from '@/components/pages/PageBanner';
import { RichTextRenderer } from '@/components/admin/pages/RichTextRenderer';
import { Loader2 } from 'lucide-react';

const SLUG = 'privacy-policy';

const fallbackContent = `## Introduction

Welcome to Nutzera. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.

## Information We Collect

### Personal Information
We may collect the following personal information when you interact with our services:
- Name and contact details (email address, phone number)
- Billing and shipping addresses
- Payment information (processed securely through our payment partners)
- Account credentials (if you create an account)
- Communication preferences

### Non-Personal Information
We automatically collect certain information when you visit our website:
- Browser type and version
- Operating system
- IP address
- Pages visited and time spent on our site
- Referring website addresses
- Device identifiers

## How We Use Information

We use the collected information for the following purposes:
- Processing and fulfilling your orders
- Communicating with you about orders, products, and services
- Improving our website and customer experience
- Sending promotional communications (with your consent)
- Complying with legal obligations
- Detecting and preventing fraud

## Cookies

We use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:
- Remember your preferences and settings
- Analyze website traffic and usage patterns
- Provide personalized content and recommendations
- Ensure website security

You can control cookie settings through your browser preferences.

## Analytics

We use analytics tools to understand how visitors interact with our website. This helps us improve our services and user experience. Analytics data is aggregated and does not identify individual users.

## Payment Information

All payment transactions are processed through secure, PCI-compliant payment processors. We do not store your complete credit card information on our servers.

## Data Security

We implement industry-standard security measures to protect your personal information, including:
- SSL/TLS encryption for data transmission
- Secure server infrastructure
- Regular security audits
- Access controls and authentication protocols

## User Rights

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Opt-out of marketing communications
- Export your data in a portable format

## Children's Privacy

Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.

## Third-party Services

We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.

## Contact Information

If you have questions about this Privacy Policy, please contact us at:

**Nutzera**
Email: privacy@nutzera.in
Phone: +91 XXXXX XXXXX

## Last Updated

This Privacy Policy was last updated on January 1, 2024.`;

export default function PrivacyPolicyPage() {
  const { data: page, isLoading } = usePageBySlug(SLUG);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[#10B981]" />
      </div>
    );
  }

  const content = page?.content || fallbackContent;

  return (
    <div>
      <PageBanner
        title={page?.title || 'Privacy Policy'}
        description="Your privacy is important to us"
        bannerImage={page?.bannerImage}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-6">
          <RichTextRenderer content={content} />
        </div>
      </section>
    </div>
  );
}
