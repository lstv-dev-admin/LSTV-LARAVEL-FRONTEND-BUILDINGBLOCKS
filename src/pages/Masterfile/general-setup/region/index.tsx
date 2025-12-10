import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { REGION_COLUMNS, REGION_FIELDS } from "@/features/masterfile/general-setup/region/utils/constant";
import { REGION_SCHEMA } from "@/features/masterfile/general-setup/region/schema";
import QUERY_KEYS from "@/constants/query-keys";

const RegionPage = () => {
	return (
		<MasterfilePageWrapper
			title="Region"
			description="Organize region definitions to support geographic reporting."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.REGION.list()}
			schema={REGION_SCHEMA}
			columns={REGION_COLUMNS}
			fields={REGION_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default RegionPage;

