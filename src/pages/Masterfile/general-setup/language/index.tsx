import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { LANGUAGE_COLUMNS, LANGUAGE_FIELDS } from "@/features/masterfile/general-setup/language/utils/constant";
import { LANGUAGE_SCHEMA } from "@/features/masterfile/general-setup/language/schema";
import QUERY_KEYS from "@/constants/query-keys";

const LanguagePage = () => {
	return (
		<MasterfilePageWrapper
			title="Language"
			description="Configure available language options for employee records."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.LANGUAGE.list()}
			schema={LANGUAGE_SCHEMA}
			columns={LANGUAGE_COLUMNS}
			fields={LANGUAGE_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default LanguagePage;

