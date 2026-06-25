'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PageBanner } from '@/components/pages/PageBanner';
import { usePageBySlug } from '@/hooks/usePages';
import { useSendContactMessage } from '@/hooks/useContactMessages';
import { contactFormSchema, type ContactFormData } from '@/validations/contact.schema';

const SLUG = 'contact';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Business Address',
    lines: ['Nutzera Foods Pvt. Ltd.', 'Mumbai, Maharashtra, India'],
  },
  {
    icon: Phone,
    title: 'Phone Number',
    lines: ['+91 XXXXX XXXXX'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['hello@nutzera.in'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
  },
];

export default function ContactPage() {
  const { data: page } = usePageBySlug(SLUG);
  const sendMessage = useSendContactMessage();
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendMessage.mutateAsync(data);
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div>
      <PageBanner
        title={page?.title || 'Contact Us'}
        description="We'd love to hear from you"
        bannerImage={page?.bannerImage}
      />

      {/* Contact Info Cards */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon size={22} className="text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-sm text-gray-500">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-500 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" placeholder="Your name" {...register('name')} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" {...register('email')} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" {...register('phone')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="How can we help?" {...register('subject')} />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[150px] resize-none"
                    {...register('message')}
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={sendMessage.isPending}
                  className="w-full sm:w-auto gap-2"
                >
                  {sendMessage.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {sendMessage.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
                Find Us
              </h2>
              <p className="text-gray-500 mb-6">
                Visit us at our office or reach out through any of the channels above.
              </p>

              <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  onLoad={() => setMapLoaded(true)}
                />
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-[#10B981]" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
