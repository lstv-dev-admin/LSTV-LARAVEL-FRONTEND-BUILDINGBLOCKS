import MasterfilePageWrapper from "@/features/masterfile/components/MasterfilePageWrapper";
import { SKILL_COLUMNS, SKILL_FIELDS } from "@/features/masterfile/general-setup/skill/utils/constant";
import { SKILL_SCHEMA } from "@/features/masterfile/general-setup/skill/schema";
import QUERY_KEYS from "@/constants/query-keys";

const SkillPage = () => {
	return (
		<MasterfilePageWrapper
			title="Skill"
			description="Catalog skill entries to support competency tracking."
			endpoint="/pager"
			queryKey={QUERY_KEYS.MASTERFILE.GENERAL_SETUP.SKILL.list()}
			schema={SKILL_SCHEMA}
			columns={SKILL_COLUMNS}
			fields={SKILL_FIELDS}
			primaryKey="record_id"
		/>
	);
};

export default SkillPage;

