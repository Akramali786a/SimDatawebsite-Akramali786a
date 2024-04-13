export  default  function robots(){
    const domainName= "pakservices.online"
    return{
        rules:{
            userAgent:"*",
            allow:'/',
            disallow:"/private/",
        },
        sitemap:`https://${domainName}/sitemap.xml`
    }
}