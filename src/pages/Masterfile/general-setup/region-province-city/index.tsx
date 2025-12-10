import { useRef } from "react";
import MasterfilePageWrapper from "@features/masterfile/components/MasterfilePageWrapper";
import { MasterfilePageWrapperRef } from "@features/masterfile/types";
import { REGION_PROVINCE_CITY_COLUMNS, REGION_PROVINCE_CITY_FIELDS } from "@features/masterfile/general-setup/region-province-city/utils/constant";
import { REGION_PROVINCE_CITY_SCHEMA } from "@features/masterfile/general-setup/region-province-city/schema";
import { Button } from "@/components/ui/button";
import QUERY_KEYS from "@/constants/query-keys";

const RegionProvinceCityPage = () => {

	return (
		<>
			<MasterfilePageWrapper
				title="Region Province City"
				description="Link regions, provinces, and cities for hierarchical location mapping."
				endpoint="/pager"
				queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.REGION_PROVINCE_CITY.list()}
				schema={REGION_PROVINCE_CITY_SCHEMA}
				columns={REGION_PROVINCE_CITY_COLUMNS}
				fields={REGION_PROVINCE_CITY_FIELDS}
				primaryKey="record_id"
			/>
		</>
	);
};

export default RegionProvinceCityPage;
