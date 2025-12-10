import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { COUNTRY_COLUMNS, COUNTRY_FIELDS } from "@/features/masterfile/general-setup/country/utils/constant";
import { COUNTRY_SCHEMA } from "@/features/masterfile/general-setup/country/schema";
import QUERY_KEYS from "@/constants/query-keys";

const CountryPage = () => {
	return (
		<MasterfilePageWrapper
			title="Country"
			description="Manage the country directory used across address forms."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.COUNTRY.list()}
			schema={COUNTRY_SCHEMA}
			columns={COUNTRY_COLUMNS}
			fields={COUNTRY_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default CountryPage;

