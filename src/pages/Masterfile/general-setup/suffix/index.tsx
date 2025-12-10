import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { SUFFIX_COLUMNS, SUFFIX_FIELDS } from "@/features/masterfile/general-setup/suffix/utils/constant";
import { SUFFIX_SCHEMA } from "@/features/masterfile/general-setup/suffix/schema";
import QUERY_KEYS from "@/constants/query-keys";

const SuffixPage = () => {
	return (
		<MasterfilePageWrapper
			title="Suffix"
			description="Configure suffix options applied to employee name formats."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.SUFFIX.list()}
			schema={SUFFIX_SCHEMA}
			columns={SUFFIX_COLUMNS}
			fields={SUFFIX_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default SuffixPage;

