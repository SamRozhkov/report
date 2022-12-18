import { FC, ReactNode } from 'react'

type layoutProps = {
    children: ReactNode,
}

const Layout:FC<layoutProps> = ({ children }) =>{
    return (
        <>
            {children}
        </>
    )
}

export default Layout;