// Features
import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { CITIZENSHIP_SCHEMA } from "@/features/masterfile/general-setup/citizenship/schema";
import { CITIZENSHIP_COLUMNS } from "@/features/masterfile/general-setup/citizenship/utils/constant";
import QUERY_KEYS from "@/constants/query-keys";

const CitizenshipPage = () => {
	return (
		<MasterfilePageWrapper
			title="Citizenship"
			description="Define citizenship categories for employee profiles."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.CITIZENSHIP.list()}
			schema={CITIZENSHIP_SCHEMA}
			columns={CITIZENSHIP_COLUMNS}
			fields={[
				{
					name: "citizenship_desc",
					label: "Citizenship description",
					placeholder: "Enter citizenship description",
					required: true,
				},
			]}
			primaryKey="record_id"
		/>
	);
};

export default CitizenshipPage;
