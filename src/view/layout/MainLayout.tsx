import React, { ReactNode } from "react"
import Link from "next/link"

type Props = {
    children: ReactNode
}

export const MainLayout = ({children}: Props): JSX.Element => {
    return (
    <div >
        <ol >
            <li>
                
            <Link href="/">Home</Link>
            </li>
            <li>

            <Link href="/community">Community</Link>
            </li>
            <li>
            <Link href="/learn">Learn</Link>

            </li>
        </ol>
        
        {children}
    </div>
    )
}

export default MainLayout