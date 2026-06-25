'use client';

import { usePageBySlug } from '@/hooks/usePages';
import { PageBanner } from '@/components/pages/PageBanner';
import { RichTextRenderer } from '@/components/admin/pages/RichTextRenderer';
import { Loader2 } from 'lucide-react';

const SLUG = 'terms-and-conditions';

const fallbackContent = `## Acceptance of Terms

By accessing and using the Nutzera website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

## Products

All products displayed on our website are subject to availability. We reserve the right to discontinue any product at any time. Product images are for illustrative purposes only and may differ from the actual product.

## Pricing

- All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise
- We reserve the right to change prices without prior notice
- In case of a pricing error, we reserve the right to cancel any orders placed at the incorrect price

## Orders

- Placing an order constitutes an offer to purchase the product
- We reserve the right to accept or reject any order
- Order confirmation will be sent via email once the order is processed
- We may need to verify information before accepting an order

## Shipping

- We aim to process and ship orders within 2-3 business days
- Delivery times may vary based on location and shipping method
- Risk of loss and title for items pass to you upon delivery
- We are not responsible for delays caused by shipping carriers

## Returns

- Products can be returned within 7 days of delivery if they are unopened and in original packaging
- Opened or consumed products cannot be returned unless they are defective
- To initiate a return, please contact our customer support team
- Return shipping costs may apply

## Refund Policy

- Refunds will be processed within 5-7 business days after receiving the returned item
- Refunds will be credited to the original payment method
- Shipping charges are non-refundable unless the return is due to our error

## Payments

- We accept various payment methods including credit/debit cards, UPI, net banking, and wallets
- All payments are processed through secure payment gateways
- You agree to provide accurate and complete payment information

## User Accounts

- You are responsible for maintaining the confidentiality of your account credentials
- You agree to notify us immediately of any unauthorized use of your account
- We reserve the right to suspend or terminate accounts that violate these terms

## Intellectual Property

All content on this website, including text, graphics, logos, images, and software, is the property of Nutzera and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.

## Limitation of Liability

Nutzera shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our products or services. Our total liability shall not exceed the amount paid by you for the specific product in question.

## Cancellation

- Orders can be cancelled before they are shipped
- Once shipped, orders cannot be cancelled and will need to be returned following our return policy
- We reserve the right to cancel orders due to product unavailability or pricing errors

## Governing Law

These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.

## Contact Information

For questions about these Terms and Conditions, please contact us at:

**Nutzera**
Email: legal@nutzera.in
Phone: +91 XXXXX XXXXX

## Last Updated

These Terms and Conditions were last updated on January 1, 2024.`;

export default function TermsPage() {
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
        title={page?.title || 'Terms & Conditions'}
        description="Please read these terms carefully"
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
