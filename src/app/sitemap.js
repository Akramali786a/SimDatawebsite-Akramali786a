export default function sitemap() {
    const domainName = "pakservices.online";
    return [
        {
            url: `https://${domainName}`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `https://${domainName}/search`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://${domainName}/ai`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        {
            url: `https://${domainName}/protectme`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
    ];
}
