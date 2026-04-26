export async function handler(event) {
    try {
        const hit = event.queryStringParameters?.hit === "true";

        const url = hit
            ? "https://api.api-ninjas.com/v1/counter?id=portfolio&hit=true"
            : "https://api.api-ninjas.com/v1/counter?id=portfolio";

        const res = await fetch(url, {
            headers: {
                "X-Api-Key": process.env.API_NINJA_KEY,
            },
        });

        const data = await res.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong" }),
        };
    }
}