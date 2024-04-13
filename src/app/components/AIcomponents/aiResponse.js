import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AiResponse({ response, userPrompt }) {
    const renderResponse = () => {
        if (!response) {
            return <Skeleton count={6} baseColor="#211f1f" />;
        }

        // Split the response into paragraphs
        const paragraphs = response.split('\n').filter(Boolean); // Filter out empty lines

        return paragraphs.map((paragraph, index) => {

            if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                // Paragraph contains code block, wrap in <code> tags
                return <code key={index}>{paragraph}</code>;
            } else {
                // Regular paragraph
                return <p key={index}>{paragraph}</p>;
            }
        });
    };

    return (
        <div className="response">
            <small className="mb-1 mt-1">User: <code>{userPrompt}</code></small>
            <br /><br />
            <span>PAK AI</span>
            {renderResponse()}
        </div>
    );
}

export default AiResponse;
