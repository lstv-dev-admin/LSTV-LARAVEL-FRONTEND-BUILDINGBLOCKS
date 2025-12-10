// Features
import SystemParameterForm from '@/features/utilities/system-parameters/components/SystemParameterForm';

// Components
import PageHeader from '@/components/PageHeader.tsx';
import PageTitle from '@/components/PageTitle';
import { Separator } from '@/components/ui/separator';

const SystemParameterPage = () => {
    return (
        <>
            <PageTitle title='System Parameter' />
            <PageHeader 
                title='System Parameter' 
                subTitle='Manage system parameters for your application'
            />
            <Separator className='my-4' />
            <SystemParameterForm />
        </>
    )
}

export default SystemParameterPage;