import { createQueryKey } from "../shares.builder"

const GENERAL_SETUP_QUERY_KEYS = {
	AREA: createQueryKey(["masterfile", "general-setup", "area"]),
	AWARD: createQueryKey(["masterfile", "general-setup", "award"]),
	BLOOD_TYPE: createQueryKey(["masterfile", "general-setup", "blood_type"]),
	CITIZENSHIP: createQueryKey(["masterfile", "general-setup", "citizenship"]),
	CITY: createQueryKey(["masterfile", "general-setup", "city"]),
	CIVIL_STATUS: createQueryKey(["masterfile", "general-setup", "civil-status"]),
	COUNTRY: createQueryKey(["masterfile", "general-setup", "country"]),
	EMPLOYMENT_TYPE: createQueryKey(["masterfile", "general-setup", "employment-type"]),
	LANGUAGE: createQueryKey(["masterfile", "general-setup", "language"]),
	LICENSE_TYPE: createQueryKey(["masterfile", "general-setup", "license-type"]),
	MEMBERSHIP_TYPE: createQueryKey(["masterfile", "general-setup", "membership-type"]),
	NATIONALITY: createQueryKey(["masterfile", "general-setup", "nationality"]),
	POSITION_TYPE: createQueryKey(["masterfile", "general-setup", "position-type"]),
	PREFIX: createQueryKey(["masterfile", "general-setup", "prefix"]),
	PROVINCE: createQueryKey(["masterfile", "general-setup", "province"]),
	REGION: createQueryKey(["masterfile", "general-setup", "region"]),
	REGION_PROVINCE_CITY: createQueryKey(["masterfile", "general-setup", "region-province-city"]),
	RELIGION: createQueryKey(["masterfile", "general-setup", "religion"]),
	REQUIREMENTS: createQueryKey(["masterfile", "general-setup", "requirements"]),
	SCHOOL: createQueryKey(["masterfile", "general-setup", "school"]),
	SKILL: createQueryKey(["masterfile", "general-setup", "skill"]),
	SUFFIX: createQueryKey(["masterfile", "general-setup", "suffix"]),
	VIOLATION: createQueryKey(["masterfile", "general-setup", "violation"]),
}

export default GENERAL_SETUP_QUERY_KEYS;