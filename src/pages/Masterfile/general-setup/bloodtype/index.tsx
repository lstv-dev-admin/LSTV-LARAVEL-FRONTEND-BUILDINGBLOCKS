// Features
import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { BLOOD_TYPE_SCHEMA } from "@/features/masterfile/general-setup/blood-type/schema";
import { BLOOD_TYPE_COLUMNS, BLOOD_TYPE_FIELDS } from "@/features/masterfile/general-setup/blood-type/utils/constant";
import QUERY_KEYS from "@/constants/query-keys";

const BloodTypePage = () => {
	return (
		<MasterfilePageWrapper
			title="Blood Type"
			description="Maintain blood type catalog for employee medical records."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.BLOOD_TYPE.list()}
			schema={BLOOD_TYPE_SCHEMA}
			columns={BLOOD_TYPE_COLUMNS}
			fields={BLOOD_TYPE_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default BloodTypePage;
