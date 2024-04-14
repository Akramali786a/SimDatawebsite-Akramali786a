import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import escape from "html-react-parser"; // Import for escaping

function AiResponse({ response, userPrompt }) {
    const renderResponse = (response) => {
        let formattedResponse = response;

        // Identify code blocks (unchanged)
        const codeRegex = /`(.*?)`/gs;
        formattedResponse = formattedResponse.replace(
            codeRegex,
            (match, code) => {
                return `<pre><code>${escape(code)}</code></pre>`; // Escape code content
            }
        );

        // Apply bold formatting (unchanged)
        const boldRegex = /\*\*(.*?)\*\*/gs;
        formattedResponse = formattedResponse.replace(
            boldRegex,
            (match, text) => {
                return `<br/><strong>${text}</strong>`;
            }
        );

        // Replace * with <br> for new lines
        formattedResponse = formattedResponse.replace(/\*/g, "<br />");

        // Ensure string return
        return formattedResponse;
    };

    return (
        <div className="response">
            <small className="mb-1 mt-1">
                User: <code>{userPrompt}</code>
            </small>
            <br />
            <br />
            <span>PAK AI</span>
            {!response ? (
                <Skeleton count={6} baseColor="#211f1f" />
            ) : (
                <div
                    dangerouslySetInnerHTML={{
                        __html: renderResponse(response),
                    }}
                />
            )}
        </div>
    );
}

export default AiResponse;
