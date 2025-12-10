import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { POSITION_TYPE_COLUMNS, POSITION_TYPE_FIELDS } from "@/features/masterfile/general-setup/position-type/utils/constant";
import { POSITION_TYPE_SCHEMA } from "@/features/masterfile/general-setup/position-type/schema";
import QUERY_KEYS from "@/constants/query-keys";

const PositionTypePage = () => {
	return (
		<MasterfilePageWrapper
			title="Position Type"
			description="Manage position type classifications for role mapping."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.POSITION_TYPE.list()}
			schema={POSITION_TYPE_SCHEMA}
			columns={POSITION_TYPE_COLUMNS}
			fields={POSITION_TYPE_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default PositionTypePage;

