import React from 'react'
import Navbar from '@/components/Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
    return (
        <div className='md:h-[100vh] lg:h-[100vh] flex flex-col'>
            <Navbar />
            {props.children}
        </div>
    )
}

export default MainLayout
