// Features
import DateLockForm from '@/features/utilities/date-lock/components/DateLockForm';

// Components
import PageHeader from '@/components/PageHeader.tsx';
import { Separator } from '@/components/ui/separator';
import PageTitle from '@/components/PageTitle';

const DateLockPage = () => {

    return (
        <>
            <PageTitle title='Date Lock' />
            <PageHeader 
                title="Date Lock"
                subTitle="Lock the date range for system operations and user access."
            />
            <Separator className='my-4' />
            <DateLockForm />
        </>
    );
};

export default DateLockPage;