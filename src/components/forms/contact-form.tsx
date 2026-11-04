"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "../icons";
import { useModalStore } from "../hooks/use-modal-store";
import { useSendContactMessageMutation } from "@/redux/features/contact/contactApi";

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must contain at least 3 characters.",
    }),
    email: z.string().email("Please enter a valid email."),
    message: z.string().min(10, {
        message: "Please write something more descriptive.",
    }),
    social: z.string().url().optional().or(z.literal("")),
});

const ContactForm = () => {
    const storeModal = useModalStore();
    const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            social: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await sendContactMessage({
                name: values.name,
                email: values.email,
                message: values.message,
                social: values.social || undefined,
            }).unwrap();

            if (res.success) {
                form.reset();
                storeModal.onOpen({
                    title: "Thank you!",
                    description: res.message || "Your message has been received! I appreciate your contact and will get back to you shortly.",
                    icon: Icons.successAnimated,
                });
            } else {
                throw new Error(res.message || "Failed to send message");
            }
        } catch (err: any) {
            console.error("Error submitting contact form:", err);
            storeModal.onOpen({
                title: "Oops!",
                description: err?.data?.message || err?.message || "Your message sending failed. Please try again.",
                icon: Icons.failedAnimated,
            });
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 min-w-full"
                toolname="submitContactForm"
                tooldescription="Submit an inquiry, message, project collaboration, or hiring request to Appon Islam."
                toolautosubmit="false"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name"
                                    toolparamdescription="Your full name"
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    toolparamdescription="Your valid email address for receiving responses"
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your message"
                                    toolparamdescription="Details about your project inquiry, question, or message"
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="social"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Social (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type="url"
                                    placeholder="Link for social account"
                                    toolparamdescription="Optional link to your LinkedIn, GitHub, or portfolio website"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ContactForm;
