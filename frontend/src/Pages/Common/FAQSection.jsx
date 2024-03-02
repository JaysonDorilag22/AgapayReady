import React, { useState } from 'react';
import AOS from "aos";
AOS.init();

const FAQData = [
    {
        question: "What information does the AgapayReady app offer to campus users?",
        answer: "AgapayReady provides essential emergency information tailored specifically for our campus community. This includes details such as campus evacuation routes, contact information for campus organizations, and guidelines for handling emergencies like first aid procedures."
    },
    {
        question: "How do I access campus emergency information through the AgapayReady app?",
        answer: "Accessing crucial emergency information is simple with AgapayReady. Users within our campus community can open the app to find detailed maps outlining evacuation routes for campus buildings. Additionally, contact information for key campus organizations involved in emergency response is readily available, ensuring quick access to necessary resources during emergencies."
    },
    {
        question: "Is the information in the AgapayReady app regularly reviewed and updated for our campus community?",
        answer: "Absolutely. At AgapayReady, we prioritize the accuracy and relevance of the information provided to our campus users. While real-time updates may not be necessary, our team regularly reviews and updates the content within the app to ensure it reflects the latest evacuation routes, contact details, and emergency guidelines specific to our campus. We're committed to keeping our campus community informed and prepared for any emergency scenario."
    }
];

function FAQItem({ faq }) {
    const [expanded, setExpanded] = useState(false);

    const toggleFAQ = () => {
        setExpanded(!expanded);
    };

    return (
        <li>
        <button
            className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
            aria-expanded={expanded}
            onClick={toggleFAQ}
        >
            <span className="flex-1 text-base-content">{faq.question}</span>
            <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="16" height="2" rx="1" className={`transform origin-center transition duration-200 ease-out ${expanded ? '' : 'rotate-0'}`} />
                <rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-90 transition duration-200 ease-out ${expanded ? 'rotate-0' : ''}`} />
            </svg>
        </button>
        <div
            className="transition-all duration-300 ease-in-out max-h-0 overflow-hidden"
            style={{ maxHeight: expanded ? '100%' : '0' }}
        >
            <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">{faq.answer}</div>
            </div>
        </div>
    </li>
    );
}

function FAQSection() {
    return (
        <div data-aos="fade-right" className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="flex flex-col text-left basis-1/2">
                <p className="inline-block font-semibold text-red-500 mb-4">AgapayReady FAQ</p>
                <p className="sm:text-4xl text-3xl font-extrabold text-base-content">Frequently Asked Questions</p>
            </div>
            <ul className="basis-1/2">
                {FAQData.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                ))}
            </ul>
        </div>
    );
}

export default FAQSection