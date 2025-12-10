import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { LICENSE_TYPE_COLUMNS, LICENSE_TYPE_FIELDS } from "@/features/masterfile/general-setup/license-type/utils/constant";
import { LICENSE_TYPE_SCHEMA } from "@/features/masterfile/general-setup/license-type/schema";
import QUERY_KEYS from "@/constants/query-keys";

const LicenseTypePage = () => {
	return (
		<MasterfilePageWrapper
			title="License Type"
			description="Catalog professional license types for compliance tracking."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.LICENSE_TYPE.list()}
			schema={LICENSE_TYPE_SCHEMA}
			columns={LICENSE_TYPE_COLUMNS}
			fields={LICENSE_TYPE_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default LicenseTypePage;

