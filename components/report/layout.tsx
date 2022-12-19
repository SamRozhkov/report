import { ReactNode } from 'react'

type layoutProps = {
    children: ReactNode,
}

export default function Layout ({ children }: layoutProps) {
    return (
        <>
            {children}
        </>
    )
}