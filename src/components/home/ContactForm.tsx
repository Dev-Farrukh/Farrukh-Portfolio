"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(senderEmail) || message.length < 10) {
      setError("Please enter your name, a valid email, and a message of at least 10 characters.");
      setSent(false);
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setError(null);
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-foreground flex flex-col gap-2 text-sm font-medium">
          Name
          <input
            name="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-ring rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />
        </label>
        <label className="text-foreground flex flex-col gap-2 text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-ring rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />
        </label>
      </div>
      <label className="text-foreground flex flex-col gap-2 text-sm font-medium">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          placeholder="Tell me a little about your project..."
          className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-ring resize-y rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      {sent && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400">
          Your email app should open with the message ready to send.
        </p>
      )}
      <Button type="submit" variant="primary" size="lg" leftIcon={<Send className="size-4" aria-hidden />}>
        <Mail className="mr-2 size-4" aria-hidden />
        Send me a message
      </Button>
    </form>
  );
}