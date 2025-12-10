// Features
import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { AWARD_SCHEMA } from "@/features/masterfile/general-setup/award/schema";
import { AWARD_COLUMNS, AWARD_FIELDS } from "@/features/masterfile/general-setup/award/utils/constant";
import QUERY_KEYS from "@/constants/query-keys";

const AwardPage = () => {
	return (
		<MasterfilePageWrapper
			title="Award"
			description="Catalog awards available for employee recognition."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.AWARD.list()}
			schema={AWARD_SCHEMA}
			columns={AWARD_COLUMNS}
			fields={AWARD_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default AwardPage;
