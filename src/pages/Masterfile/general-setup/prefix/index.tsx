import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { PREFIX_COLUMNS, PREFIX_FIELDS } from "@/features/masterfile/general-setup/prefix/utils/constant";
import { PREFIX_SCHEMA } from "@/features/masterfile/general-setup/prefix/schema";
import QUERY_KEYS from "@/constants/query-keys";

const PrefixPage = () => {
	return (
		<MasterfilePageWrapper
			title="Prefix"
			description="Configure personal prefixes used across naming conventions."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.PREFIX.list()}
			schema={PREFIX_SCHEMA}
			columns={PREFIX_COLUMNS}
			fields={PREFIX_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default PrefixPage;

