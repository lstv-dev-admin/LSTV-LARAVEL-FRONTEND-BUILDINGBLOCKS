// Features
import useSystemParameter from '../hooks/useSystemParameter';

// Components
import DataTable, { IColumn } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
const SystemParameterForm = () => {

    const { 
        form, 
        TABLE_DATA, 
        SYSTEM_PARAMETER_COLUMNS, 
        isLoading, 
        isFetching, 
        isError, 
        isPending, 
        onSubmit 
    } = useSystemParameter();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <DataTable
                    columns={SYSTEM_PARAMETER_COLUMNS}
                    data={TABLE_DATA}
                    isLoading={isLoading || isFetching}
                    isError={isError}
                    hidePagination={true}
                />
                <div className='ml-auto space-x-2'>
                    <Button 
                        type="submit" 
                        disabled={isPending || !form.formState.isDirty}
                    >
                        {isPending ? 'Updating...' : 'Update'}
                    </Button>
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => form.reset()}
                        disabled={isPending || !form.formState.isDirty}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SystemParameterForm;