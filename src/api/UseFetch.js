import { useState, useEffect } from "react";

export default function useFetch({ api, method, url, data = null, config = null }) {
    let [response, setResponse] = useState(null);
    let [error, setError] = useState("");
    let [isLoading, setIsLoading] = useState(true);
    let [URL, setURL] = useState(url);

    let changeURL = (link) => {
        setURL(link);
        setResponse(null);
        setError("");
        setIsLoading(true);
    };

    useEffect(() => {
        let fetchData = async () => {
            try {
                api[method](URL, data, config)
                    .then((res) => {
                        setResponse(res.data);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch (err) {
                setError(err);
            }
        };
        fetchData();
    }, [api, method, url, data, config, URL]);

    return { response, error, isLoading, changeURL };
}