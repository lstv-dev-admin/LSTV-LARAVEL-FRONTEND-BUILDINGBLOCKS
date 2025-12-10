import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { SCHOOL_COLUMNS, SCHOOL_FIELDS } from "@/features/masterfile/general-setup/school/utils/constant";
import { SCHOOL_SCHEMA } from "@/features/masterfile/general-setup/school/schema";
import QUERY_KEYS from "@/constants/query-keys";

const SchoolPage = () => {
	return (
		<MasterfilePageWrapper
			title="School"
			description="Maintain the school directory for employee education history."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.SCHOOL.list()}
			schema={SCHOOL_SCHEMA}
			columns={SCHOOL_COLUMNS}
			fields={SCHOOL_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default SchoolPage;

