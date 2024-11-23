import Profile from '@/components/settings/Profile'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Asul } from 'next/font/google'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <Profile user={session?.user} />

        </div>
    )
}

export default page
