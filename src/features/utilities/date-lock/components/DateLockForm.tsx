// Features
import { useDateLockForm } from '../hooks/useDateLockForm';

// Components
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import DateField from '@/components/Fields/DateField';
import InputField from '@/components/Fields/InputField';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

// Libs
import { Save, X } from 'lucide-react';
import { Controller } from 'react-hook-form';

const DateLockForm = () => {
	const {
		form,
		isDisabled,
		disableDateFields,
		disableDaysFields,
		onSubmit,
		resetToServerData,
		handleDaysBeforeChange,
		handleDaysAfterChange,
		handleAutomatedLockingChange,
		AUTOMATED_LOCKING_ENABLED,
	} = useDateLockForm();

	return (
		<Card className='container max-w-[600px] mx-auto'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardHeader className='px-0'>
						<CardTitle>System Date Lock</CardTitle>
					</CardHeader>
					<CardContent className='px-0 space-y-4'>
						<div className='grid sm:grid-cols-2 gap-4'>
							<DateField 
								name='date_from'
								control={form.control}
								label='From'
								required
								placeholder='mm/dd/yyyy'
								valueFormat='default'
								disabled={disableDateFields}
							/>
							<DateField 
								name='date_to'
								control={form.control}
								label='To'
								required
								placeholder='mm/dd/yyyy'
								valueFormat='default'
								minDate={new Date()}
								disabled={disableDateFields}
							/>
						</div>
						<p className='mx-auto w-fit'>
							(The system Lock all the data outside this range)
						</p>
						<div className='flex items-center gap-4'>
							<Controller
								name="is_date_lock_automatic"
								control={form.control}
								render={({ field }) => (
									<FormItem className="flex items-center gap-2 space-y-0">
										<FormControl>
											<Checkbox
												checked={field.value === AUTOMATED_LOCKING_ENABLED}
												disabled={isDisabled}
												onCheckedChange={handleAutomatedLockingChange}
											/>
										</FormControl>
										<FormLabel className="font-normal cursor-pointer">
											Automated Locking
										</FormLabel>
									</FormItem>
								)}
							/>
							<Separator className='flex-1' />
						</div>
						<div className='grid sm:grid-cols-2 gap-4'>
							<InputField 
								name='days_before'
								control={form.control}
								label='Days before'
								placeholder='Days'
								type='number'
								required
								disabled={disableDaysFields}
								onChange={handleDaysBeforeChange}
								min={0}
							/>
							<InputField 
								name='days_after'
								control={form.control}
								label='Days after'
								placeholder='Days'
								type='number'
								required
								disabled={disableDaysFields}
								onChange={handleDaysAfterChange}
								min={0}
							/>
						</div>
						<p>
							Note: Automatic date locking will take effect everytime you log on.
							You can only add, edit, and delete within the specified date range.
						</p>
					</CardContent>
					<CardFooter className='flex flex-col sm:flex-row justify-end gap-2 px-0'>
						<Button 
							size='sm' 
							className='w-full sm:w-auto' 
							type='submit'
							disabled={!form.formState.isDirty || isDisabled}
						>
							<Save /> Save
						</Button>
						<Button 
							size='sm' 
							variant='outline' 
							className='w-full sm:w-auto'
							type='button'
							onClick={resetToServerData}
							disabled={isDisabled}
						>
							<X /> Cancel
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

export default DateLockForm;