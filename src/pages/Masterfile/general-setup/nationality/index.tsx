import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { NATIONALITY_COLUMNS, NATIONALITY_FIELDS } from "@/features/masterfile/general-setup/nationality/utils/constant";
import { NATIONALITY_SCHEMA } from "@/features/masterfile/general-setup/nationality/schema";
import QUERY_KEYS from "@/constants/query-keys";

const NationalityPage = () => {
	return (
		<MasterfilePageWrapper
			title="Nationality"
			description="Maintain nationality options for demographic reporting."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.NATIONALITY.list()}
			schema={NATIONALITY_SCHEMA}
			columns={NATIONALITY_COLUMNS}
			fields={NATIONALITY_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default NationalityPage;

