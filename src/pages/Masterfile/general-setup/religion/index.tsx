import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { RELIGION_COLUMNS, RELIGION_FIELDS } from "@/features/masterfile/general-setup/religion/utils/constant";
import { RELIGION_SCHEMA } from "@/features/masterfile/general-setup/religion/schema";
import QUERY_KEYS from "@/constants/query-keys";

const ReligionPage = () => {
	return (
		<MasterfilePageWrapper
			title="Religion"
			description="Catalog religion options for employee demographic records."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.RELIGION.list()}
			schema={RELIGION_SCHEMA}
			columns={RELIGION_COLUMNS}
			fields={RELIGION_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default ReligionPage;

