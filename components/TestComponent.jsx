"use client"
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function TestComponent() {

    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {

        if (status === 'authenticated') {
            const user = session?.user;
            if (user) {

                if (user.Patient) {
                    router.push("/");
                    console.log('Patient access is restricted');
                }
            }
            //     if (status === 'authenticated') {
            //         const user = session?.user;
            //         if (user) {
            //             if (user.Dietitian) {
            //                 console.log('Logged in as Dietitian');
            //             } else if (user.Patient) {
            //                 console.log('Logged in as Patient');
            //             } else {
            //                 console.log('Logged in as Regular Person');
            //             }
            //         }
        }
    }, [session, status]);

    return (
        <div>Test</div>
    )
}
