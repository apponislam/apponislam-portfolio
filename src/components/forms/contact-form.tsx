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

const GOOGLE_FORM_ID = "1FAIpQLSfmBwQ2yyYVOcVJ4GfRJV8TVIKzR4GW2RSG3BvlDekLaV1G-g";
const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const GOOGLE_FORM_ENTRY_IDS = {
    name: "entry.1633920210",
    email: "entry.227649005",
    message: "entry.790080973",
    social: "entry.1770822543",
};

const ContactForm = () => {
    const storeModal = useModalStore();

    // const [open, setOpen] = useState(false);

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
            const formData = new URLSearchParams();
            formData.append(GOOGLE_FORM_ENTRY_IDS.name, values.name);
            formData.append(GOOGLE_FORM_ENTRY_IDS.email, values.email);
            formData.append(GOOGLE_FORM_ENTRY_IDS.message, values.message);
            formData.append(GOOGLE_FORM_ENTRY_IDS.social, values.social || "");

            // Send POST request to Google Form
            const response = await fetch(GOOGLE_FORM_URL, {
                method: "POST",
                body: formData,
                mode: "no-cors", // required to avoid CORS issues
            });

            console.log(response);
            console.log("Form submitted successfully:", values);

            // Show success message
            form.reset();
            storeModal.onOpen({
                title: "Thankyou!",
                description: "Your message has been received! I appreciate your contact and will get back to you shortly.",
                icon: Icons.successAnimated,
            });
        } catch (err) {
            console.log("Err!", err);
            storeModal.onOpen({
                title: "Oops!",
                description: "Your message send failed.",
                icon: Icons.failedAnimated,
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
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
                                <Input placeholder="Enter your email" {...field} />
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
                                <Textarea placeholder="Enter your message" {...field} />
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
                                <Input placeholder="Link for social account" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default ContactForm;
