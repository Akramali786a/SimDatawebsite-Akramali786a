import React, { useEffect } from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Prism from 'prismjs';

function AiResponse({ response, userPrompt }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="response">
            <small className="mb-1 mt-1">User: <code>{userPrompt}</code></small>
            <br /><br />
            <span>PAK AI</span>
            {/* Render response with Prism.js highlighting */}
            <pre className="language-text">
                {!response ? <Skeleton count={6} baseColor="#211f1f" /> : <code className="language-text" dangerouslySetInnerHTML={{ __html: Prism.highlight(response, Prism.languages.text) }} />}
            </pre>
        </div>
    );
}

export default AiResponse;
