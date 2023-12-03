import { useEffect,useState } from 'react';
import { Client } from '@stomp/stompjs';

export const useStompjs = () => {
    const [client, setClient] = useState({});
    const [message, setMessage] = useState({});
    const [stompInitialized, setStompInitialized] = useState(false);
    useEffect(() => {
        const client = new Client({
            brokerURL: import.meta.env.VITE_WS_BACKEND_URL,
            onConnect: () => {
                console.log('connected')
                client.subscribe('/topic/*', message =>
                setMessage(message.body)
                    //console.log(`Received: ${message.body}`)
                )
            },
        })
        client.activate()
        setClient({ client })
        setStompInitialized(true);
        return () => {
            //console.log('useStompjs return');
            setClient({})
            setStompInitialized(false);
        }
    }, [stompInitialized,message])
    return { stompInitialized,client,message };
}

export default useStompjs;