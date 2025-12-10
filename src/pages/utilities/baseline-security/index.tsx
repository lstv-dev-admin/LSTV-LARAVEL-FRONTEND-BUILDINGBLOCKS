// Features
import useBaselineSecurityForm from '@/features/utilities/baseline-security/hooks/useBaselineSecurityForm';

// Components
import { Form } from '@/components/ui/form';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader.tsx';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageTitle from '@/components/PageTitle';

// Libs
import { Save } from 'lucide-react';

const BaselineSecurityPage = () => {
    const { 
        isLoading,
        isPending,
        isError,
        
        activeTab, 
        setActiveTab,
        
        form, 
        onSubmit,

        LOGIN_DATA ,
        PASSWORD_DATA,
        SYSTEM_SECURITY_COLUMNS 
    } = useBaselineSecurityForm();

    return (
        <>
            <PageTitle title='Baseline Security' />
            <PageHeader 
                title="Baseline Security" 
                subTitle="Baseline Security is a security policy that is used to protect the system from security threats." 
            />
            <Separator className='my-4' />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Tabs 
                        value={activeTab} 
                        onValueChange={(value) => {
                            form.reset();
                            setActiveTab(value);
                        }}
                        className='hidden sm:flex justify-between'
                    >
                        <TabsList>
                            <TabsTrigger value="password-settings">Password Settings</TabsTrigger>
                            <TabsTrigger value="login-configuration">Login Configuration</TabsTrigger>
                        </TabsList>
                        <Button 
                            size='sm' 
                            type='submit' 
                            disabled={!form.formState.isDirty || isPending}
                        > 
                            <Save /> Save 
                        </Button>
                    </Tabs>
                    <Select 
                        value={activeTab} 
                        onValueChange={(value) => {
                            form.reset();
                            setActiveTab(value);
                        }}
                    >
                        <SelectTrigger className="w-full sm:hidden">
                            <SelectValue placeholder="Select tab" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="password-settings">Password Settings</SelectItem>
                            <SelectItem value="login-configuration">Login Configuration</SelectItem>
                        </SelectContent>
                    </Select>
                    <Tabs defaultValue='password-settings' value={activeTab}>
                        <TabsContent value='password-settings'>
                            <DataTable
                                columns={SYSTEM_SECURITY_COLUMNS}
                                data={PASSWORD_DATA}
                                isError={isError}
                                isLoading={isLoading}
                                hidePagination
                            />
                        </TabsContent>
                        <TabsContent value='login-configuration'>
                            <DataTable 
                                columns={SYSTEM_SECURITY_COLUMNS}
                                data={LOGIN_DATA}
                                isError={isError}
                                isLoading={isLoading}
                                hidePagination
                            />
                        </TabsContent>
                    </Tabs>
                    <Button 
                        size='sm' 
                        type='submit' 
                        disabled={!form.formState.isDirty || isPending} 
                        className='w-full mt-2 sm:hidden'
                    > 
                        <Save /> Save 
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default BaselineSecurityPage;