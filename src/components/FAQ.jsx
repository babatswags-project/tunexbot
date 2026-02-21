import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const faqs = [
        {
            q: "Do you provide proxies for the bots?",
            a: "No, we do not provide proxies. TuNeXbot is a pure automation software platform. You will need to securely integrate your own residential or private proxies into the bot to ensure your traffic remains undetected and diverse."
        },
        {
            q: "What is the difference between XPath Mode and \"Any\" Mode?",
            a: "XPath Mode (available on the Free Plan) requires you to manually define CSS selectors or exact coordinates for the bot to interact with a page. \"Any\" Mode (Pro Plans) uses intelligent algorithms to autonomously search, reason, and click on relevant links or YouTube videos based on a simple keyword prompt."
        },
        {
            q: "Can the Free Plan bots Like or Subscribe on YouTube?",
            a: "No. The Free Plan allows bots to generate views by watching videos, but active engagement features like Liking and Subscribing are strictly reserved for our Primary Pro and Secondary Pro subscribers to maintain network quality."
        },
        {
            q: "Where is my data stored if I am on the Free Plan?",
            a: "If you are using the Free Plan, all bot execution data, interaction logs, and target configurations are stored locally on your own PC. We do not store any of this data on our external servers."
        },
        {
            q: "Do you offer refunds if I am not satisfied?",
            a: "No. We offer a robust Free Plan specifically so you can test our bot automation and see how it works for your use-case. Because you can verify our service for free, we enforce a strict No Refund policy on paid subscriptions."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="section" style={{ position: 'relative', marginTop: '2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="outfit-font" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <HelpCircle className="text-gradient" size={36} /> Frequently Asked Questions
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                        Everything you need to know about how TuNeXbot operates.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="glass-card"
                            style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 className="outfit-font" style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>{faq.q}</h3>
                                <ChevronDown
                                    size={20}
                                    color="var(--text-secondary)"
                                    style={{
                                        transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            </div>

                            <div style={{
                                maxHeight: openIndex === i ? '200px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease',
                                marginTop: openIndex === i ? '1rem' : '0',
                                opacity: openIndex === i ? 1 : 0
                            }}>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQ;
