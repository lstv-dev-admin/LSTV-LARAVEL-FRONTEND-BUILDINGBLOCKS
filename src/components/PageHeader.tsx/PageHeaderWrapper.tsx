import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    className?: string;
}

const PageHeaderWrapper = ({ children, className }: Props) => {
    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {children}
        </div>
    )
}

export default PageHeaderWrapper