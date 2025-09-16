import { useState, useEffect } from 'react';
import { getTrafficData } from '../services/trafficAPI';

const POLLING_INTERVAL = 5000; // 5 seconds

export const useTrafficData = () => {
    const [trafficData, setTrafficData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Keep loading true on refetch, but don't show the main spinner if we already have data
                if (!trafficData) setIsLoading(true);
                const data = await getTrafficData();
                setTrafficData(data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, POLLING_INTERVAL);
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [trafficData]); // Dependency array includes trafficData to manage initial loading state correctly

    return { trafficData, isLoading: isLoading && !trafficData, error };
};
