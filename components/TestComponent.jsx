"use client"
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function TestComponent() {

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            const user = session?.user;
            console.log(user);
            if (user) {
                if (user.Dietitian) {
                    console.log('Logged in as Dietitian');
                } else if (user.patient) {
                    console.log('Logged in as Patient');
                } else {
                    console.log('Logged in as Regular Person');
                }
            }
        }
    }, [session, status]);

    return (
        <div>Test</div>
    )
}
