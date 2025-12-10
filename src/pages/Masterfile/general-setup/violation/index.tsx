import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { VIOLATION_COLUMNS, VIOLATION_FIELDS } from "@/features/masterfile/general-setup/violation/utils/constant";
import { VIOLATION_SCHEMA } from "@/features/masterfile/general-setup/violation/schema";
import QUERY_KEYS from "@/constants/query-keys";

const ViolationPage = () => {
	return (
		<MasterfilePageWrapper
			title="Violation"
			description="Define violation types used in disciplinary records."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.VIOLATION.list()}
			schema={VIOLATION_SCHEMA}
			columns={VIOLATION_COLUMNS}
			fields={VIOLATION_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default ViolationPage;

