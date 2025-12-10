// Features
import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { AREA_COLUMNS, AREA_FIELDS } from "@/features/masterfile/general-setup/area/utils/constant";
import { AREA_SCHEMA } from "@/features/masterfile/general-setup/area/schema";
import QUERY_KEYS from "@/constants/query-keys";

const AreaPage = () => {
	return (
		<MasterfilePageWrapper
			title="Area"
			description="Maintain area options used for organizational locations."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.AREA.list()}
			schema={AREA_SCHEMA}
			columns={AREA_COLUMNS}
			fields={AREA_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default AreaPage;
