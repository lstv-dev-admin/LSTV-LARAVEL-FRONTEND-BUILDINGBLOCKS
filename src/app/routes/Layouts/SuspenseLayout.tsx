import { ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

const SuspenseLayout = ({children}: Props) => {
    return (
        <div>
            <Suspense fallback={<>{children}</>}> {children ?? <Outlet />} </Suspense>
        </div>
    );
}

export default SuspenseLayout