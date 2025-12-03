import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return new Response(JSON.stringify({ error: "Invalid email" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const brevo = await import("@getbrevo/brevo");
        const apiKey = import.meta.env.BREVO_API_KEY;

        if (!apiKey) {
            console.error("BREVO_API_KEY not found");
            return new Response(
                JSON.stringify({ error: "Missing configuration" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        // 1. Add contact to Brevo list
        const contactsApi = new brevo.ContactsApi();
        contactsApi.setApiKey(brevo.ContactsApiApiKeys.apiKey, apiKey);

        try {
            await contactsApi.createContact({
                email,
                listIds: [3],
                attributes: {
                    DATE_TELECHARGEMENT: new Date().toISOString(),
                },
                updateEnabled: true,
            });
        } catch (contactError: any) {
            // Ignore if contact already exists
            console.log(
                "Contact creation:",
                contactError?.message || "Contact might already exist",
            );
        }

        // 2. Send email with PDF
        const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey,
            apiKey,
        );

        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.to = [{ email }];
        sendSmtpEmail.templateId = 1; // Uses Brevo template with PDF attachment

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return new Response(
            JSON.stringify({
                success: true,
                message: "Email sent successfully",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        );
    } catch (error: any) {
        console.error("Error sending email:", error);
        return new Response(
            JSON.stringify({
                error: "Error sending email",
                details: error?.message || "Unknown error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
};
