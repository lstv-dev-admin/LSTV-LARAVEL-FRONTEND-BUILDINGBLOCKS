import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { PROVINCE_COLUMNS, PROVINCE_FIELDS } from "@/features/masterfile/general-setup/province/utils/constant";
import { PROVINCE_SCHEMA } from "@/features/masterfile/general-setup/province/schema";
import QUERY_KEYS from "@/constants/query-keys";

const ProvincePage = () => {
	return (
		<MasterfilePageWrapper
			title="Province"
			description="Maintain province entries for regional address mapping."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.PROVINCE.list()}
			schema={PROVINCE_SCHEMA}
			columns={PROVINCE_COLUMNS}
			fields={PROVINCE_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default ProvincePage;
