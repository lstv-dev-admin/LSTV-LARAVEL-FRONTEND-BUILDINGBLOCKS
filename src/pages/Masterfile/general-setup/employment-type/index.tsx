import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { EMPLOYMENT_TYPE_COLUMNS, EMPLOYMENT_TYPE_FIELDS } from "@/features/masterfile/general-setup/employment-type/utils/constant";
import { EMPLOYMENT_TYPE_SCHEMA } from "@/features/masterfile/general-setup/employment-type/schema";
import QUERY_KEYS from "@/constants/query-keys";

const EmploymentTypePage = () => {
	return (
		<MasterfilePageWrapper
			title="Employment Type"
			description="Define employment type categories for workforce planning."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.EMPLOYMENT_TYPE.list()}
			schema={EMPLOYMENT_TYPE_SCHEMA}
			columns={EMPLOYMENT_TYPE_COLUMNS}
			fields={EMPLOYMENT_TYPE_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default EmploymentTypePage;

