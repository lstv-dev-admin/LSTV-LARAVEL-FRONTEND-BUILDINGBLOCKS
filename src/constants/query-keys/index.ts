import GENERAL_SETUP_QUERY_KEYS from "@/constants/query-keys/masterfile/general-setup";

const QUERY_KEYS = {
	MASTERFILE: {
		GENERAL_SETUP: GENERAL_SETUP_QUERY_KEYS,
	},
	UTILITIES: {
        USER_FILES: ["utilities", "user-files"],
        DATE_LOCK: ["utilities", "date-lock"],
		BASELINE_SECURITY: ["utilities", "baseline-security"],
        USER_ACTIVITY_LOG: ["utilities", "user-activity-log"],
        SYSTEM_PARAMETERS: ["utilities", "system-parameters"],
	},
}

export default QUERY_KEYS;