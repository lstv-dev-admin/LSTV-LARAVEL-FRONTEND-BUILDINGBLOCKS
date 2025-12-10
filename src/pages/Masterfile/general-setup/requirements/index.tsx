import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { REQUIREMENTS_COLUMNS, REQUIREMENTS_FIELDS } from "@/features/masterfile/general-setup/requirements/utils/constant";
import { REQUIREMENTS_SCHEMA } from "@/features/masterfile/general-setup/requirements/schema";
import QUERY_KEYS from "@/constants/query-keys";

const RequirementsPage = () => {
	return (
		<MasterfilePageWrapper
			title="Requirements"
			description="Define requirement entries used in onboarding and compliance checklists."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.REQUIREMENTS.list()}
			schema={REQUIREMENTS_SCHEMA}
			columns={REQUIREMENTS_COLUMNS}
			fields={REQUIREMENTS_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default RequirementsPage;

