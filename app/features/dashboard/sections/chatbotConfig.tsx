import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

export default function ChatbotConfig() {
    return (
        <Card
            style={{
                background: "#fff",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                marginTop: 17,
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: "100%" }}>
                    {/* Icon and heading in a row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                        <div
                            style={{
                                background: "#f5f7ff",
                                borderRadius: 20,
                                padding: 5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 48,
                                width: 48,
                                marginRight: 0,
                            }}
                        >
                            <Image
                                src="/assets/logos/chatbot-logo.svg"
                                alt="chatbot"
                                width={24}
                                height={24}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <h3 style={{ color: "#6c63ff", margin: 0, fontWeight: 600, fontSize: 18 }}>
                            Chatbot Config
                        </h3>
                    </div>
                    <p style={{ color: "#555", margin: "8px 0 20px 0", fontSize: 15 }}>
                        Set up chatbot responses to provide intelligent, role-based assistance and enhance user engagement across GamiTool.
                    </p>
                    <Button style={{
                        backgroundColor: "#7FBA7A"
                    }}>
                        Config chatbot
                    </Button>
                </div>
            </div>
        </Card>
    );
}
