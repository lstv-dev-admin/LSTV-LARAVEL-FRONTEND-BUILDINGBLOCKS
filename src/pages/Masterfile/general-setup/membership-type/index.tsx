import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { MEMBERSHIP_TYPE_COLUMNS, MEMBERSHIP_TYPE_FIELDS } from "@/features/masterfile/general-setup/membership-type/utils/constant";
import { MEMBERSHIP_TYPE_SCHEMA } from "@/features/masterfile/general-setup/membership-type/schema";
import QUERY_KEYS from "@/constants/query-keys";

const MembershipTypePage = () => {
	return (
		<MasterfilePageWrapper
			title="Membership Type"
			description="Track membership type categories for affiliation records."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.MEMBERSHIP_TYPE.list()}
			schema={MEMBERSHIP_TYPE_SCHEMA}
			columns={MEMBERSHIP_TYPE_COLUMNS}
			fields={MEMBERSHIP_TYPE_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default MembershipTypePage;

