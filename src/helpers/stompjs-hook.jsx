import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

export const useStompjs = (connect) => {
    const [client, setClient] = useState({});
    const [message, setMessage] = useState({});
    const [stompInitialized, setStompInitialized] = useState(false);
    useEffect(() => {
        const client = new Client({
            brokerURL: import.meta.env.VITE_WS_BACKEND_URL,
            /*
            onConnect: () => {
                client.subscribe('/topic/*', message =>
                    setMessage(message.body)
                    //console.log(`Received: ${message.body}`)
                )
                
                console.log('connected')
            },
            onDisconnect: () => {
                console.log('disconnected')
                client.unsubscribe()
                client.deactivate()
            },
            
            debug: (msg) => {
                console.log(msg)
            },*/
            /*
            debug: (msg) => {
                console.log(new Date(),msg)
            },*/
            reconnectDelay: 0,
            heartbeatIncoming: 0,
            heartbeatOutgoing: 20000,

            onChangeState: (state) => {
                //console.log('state changed',state)
            }
        })
        
        if(connect){
            client.onConnect = () => {
                client.subscribe('/topic/*', message =>
                    setMessage(message.body)
                    //console.log(`Received: ${message.body}`)
                )
            }
            
            client.activate()
            //console.log('useStompjs',client.active)
        }else{
            //console.log('useStompjs',client.active)
            client.onDisconnect = () => {
                console.log('disconnected')
                client.unsubscribe()
                client.deactivate()
            }
            
            //console.log('disconnected')
            //client.unsubscribe()
                //console.log('disconnected')
            /*if(client.active){
                client.unsubscribe()
                client.deactivate()
                console.log('disconnected')
            }*/
        }
        
        
        setClient({ client })
        setStompInitialized(true);
        return () => {
            //console.log('useStompjs return');
            setClient({})
            setStompInitialized(false);

        }
    }, [])
    return { stompInitialized, client, message };
}

export default useStompjs;