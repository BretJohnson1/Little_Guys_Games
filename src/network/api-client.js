class ApiIntegration {
    // replace this with the url where your server is hosted.
    serverUrl = "http://localhost:3000";
    async sendApplicationEmail(applicantData)
    {
        // add applicantData as body to this fetch req.
        await fetch(`${this.serverUrl}/api/apply`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(applicantData)
        });
    }

}


export const ApiClient = new ApiIntegration();