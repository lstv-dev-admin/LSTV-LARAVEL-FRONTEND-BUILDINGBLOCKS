import { useFormField } from '../../../ui/form';
import { DateInputProps } from '../types';
import DateInput from './DateInput';

const DateInputWrapper = ({ value, onChange, placeholder, dateFormat, valueFormat, error, disabled, className, maxDate, minDate }: Omit<DateInputProps, 'id'>) => {
	const { formItemId } = useFormField();
	return (
		<DateInput
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			dateFormat={dateFormat}
			valueFormat={valueFormat}
			error={error}
			disabled={disabled}
			className={className}
			id={formItemId}
			maxDate={maxDate}
			minDate={minDate}
		/>
	);
};

export default DateInputWrapper;

