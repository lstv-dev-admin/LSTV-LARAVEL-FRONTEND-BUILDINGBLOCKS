import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { CITY_SCHEMA } from "@/features/masterfile/general-setup/city/schema";
import { CITY_COLUMNS, CITY_FIELDS } from "@/features/masterfile/general-setup/city/utils/constant";
import QUERY_KEYS from "@/constants/query-keys";

const CityPage = () => {
	return (
		<MasterfilePageWrapper
			title="City"
			description="Maintain the city list used for address selection."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.CITY.list()}
			schema={CITY_SCHEMA}
			columns={CITY_COLUMNS}
			fields={CITY_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default CityPage;
