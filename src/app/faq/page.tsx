import React from "react";
import { FAQ_SCREEN_METADATA } from "./metadata";
import { Metadata } from "next";

export const metadata : Metadata = {...FAQ_SCREEN_METADATA};

const faqs = [
    {
        question: "What is this blog about?",
        answer:
            "Our blog covers a wide range of topics including web development, programming tutorials, tech news, and productivity tips to help you stay ahead in the digital world.",
    },
    {
        question: "How often is new content published?",
        answer:
            "We publish fresh articles every week, ensuring you always have something new and insightful to read.",
    },
    {
        question: "Can I contribute to the blog?",
        answer:
            "Absolutely! We welcome guest posts from passionate writers. Please visit our 'Contribute' page for guidelines and submission details.",
    },
    {
        question: "How can I stay updated with the latest posts?",
        answer:
            "Subscribe to our newsletter or follow us on social media to receive instant updates on new articles and features.",
    },
    {
        question: "Is the content free to access?",
        answer:
            "Yes, all our blog content is freely accessible. We believe in sharing knowledge with the community.",
    },
];

export default function FAQPage() {
    return (
        <div className="max-w-6xl px-4 mb-20 pt-12">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-12">
            <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-10 drop-shadow-lg">
                Frequently Asked Questions
            </h1>
            <div className="space-y-8">
                {faqs.map((faq, idx) => (
                <div
                    key={idx}
                    className="bg-gradient-to-r from-purple-100 to-blue-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow"
                >
                    <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-400 bg-clip-text text-transparent">
                    {faq.question}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                    </p>
                </div>
                ))}
            </div>
            </div>
        </div>
    );
}