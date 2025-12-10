// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import DateField from '@/components/Fields/DateField';
import InputField from '@/components/Fields/InputField';
import AsyncSelectField from '@/components/Fields/AsyncSelectField';

// Features
import { USER_ACTIVITY_LOGS_DEFAULT_FILTERS } from '../utils/constants';
import { FilterLogFormData } from '../schema';

// Libs
import { UseFormReturn } from 'react-hook-form';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { resetFormValues } from '@/utils/reset-form-values';

interface FilterLogFormProps {
	form: UseFormReturn<FilterLogFormData>;
	onSubmit: (values: FilterLogFormData) => void;
}

const FilterLogForm = ({ form, onSubmit }: FilterLogFormProps) => {
	
    const handleClear = () => 
        resetFormValues(form, USER_ACTIVITY_LOGS_DEFAULT_FILTERS, { shouldDirty: true });
	

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<div className='grid sm:grid-cols-2 gap-4'>
					<DateField
						name='date_from'
						control={form.control}
						label="Date From"
						placeholder="mm/dd/yyyy"
                        valueFormat='yyyy-mm-dd'
                        maxDate={new Date()}
					/>
					<DateField
						name='date_to'
						control={form.control}
						label="Date To"
						placeholder="mm/dd/yyyy"
                        valueFormat='yyyy-mm-dd'
						maxDate={new Date()}
					/>
				</div>
                <InputField 
                    name='activity' 
                    control={form.control} 
                    label='Activity' 
                    placeholder='Enter activity' 
                />
				<InputField 
					name='remarks' 
					control={form.control} 
					label='Remarks' 
					placeholder='Enter remarks' 
				/>
				<AsyncSelectField 
					name='user'
					control={form.control}
					endpoint='/utilities/user-files'
					queryKey='users'
					label='User'
					valueField='first_name'
					labelField='username'
					placeholder='Select user'
				/>
				<div className='flex justify-end space-x-4'>
					<Button type="submit" disabled={!form.formState.isDirty}>
						<SlidersHorizontal className="h-4 w-4 mr-2" />
						Filter
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={handleClear}
					>
						<RotateCcw className="h-4 w-4 mr-2" />
						Clear
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default FilterLogForm;