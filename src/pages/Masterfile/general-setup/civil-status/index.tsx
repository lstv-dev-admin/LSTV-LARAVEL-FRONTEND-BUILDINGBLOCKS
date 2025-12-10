import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { CIVIL_STATUS_COLUMNS, CIVIL_STATUS_FIELDS } from "@/features/masterfile/general-setup/civil-status/utils/constant";
import { CIVIL_STATUS_SCHEMA } from "@/features/masterfile/general-setup/civil-status/schema";
import QUERY_KEYS from "@/constants/query-keys";

const CivilStatusPage = () => {
	return (
		<MasterfilePageWrapper
			title="Civil Status"
			description="Configure civil status options referenced in employee records."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.CIVIL_STATUS.list()}
			schema={CIVIL_STATUS_SCHEMA}
			columns={CIVIL_STATUS_COLUMNS}
			fields={CIVIL_STATUS_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default CivilStatusPage;
