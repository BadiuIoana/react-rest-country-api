import { useState, useCallback } from "react";

//A hook for making request for posting or getting data from a server
//requestConfig is an object witch have all the configuration data for making the fetch request

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(
        async (requestConfig, fctToExecuteAfterRequest) => {
            setIsLoading(true);
            try {
                const response = await fetch(requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : "GET",
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body
                        ? JSON.stringify(requestConfig.body)
                        : null,
                });

                if (!response.ok) {
                    throw new Error("Request failed!");
                }

                const data = await response.json();
                fctToExecuteAfterRequest(data);
            } catch (err) {
                setError(err.message || "Something went wrong!");
            }
            setIsLoading(false);
        },
        []
    );

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
