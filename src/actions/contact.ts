"use server";

import type { z } from "zod";
import { contactFormSchema } from "@/lib/schemas";

export async function sendContactEmail(
  data: z.infer<typeof contactFormSchema>
) {
  try {
    // Here you would typically integrate with an email service
    // like Resend, SendGrid, or Nodemailer.
    console.log("Received contact form submission:", data);

    // For demonstration, we'll just simulate a successful submission.
    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
