import { lazy } from 'react';
import { Route } from 'react-router-dom';

// General Setup

// todo Follow this format
const Area = lazy(() => import('@/pages/masterfile/general-setup/area'));
const Award = lazy(() => import('@/pages/masterfile/general-setup/award'));
const BloodType = lazy(() => import('@/pages/masterfile/general-setup/bloodtype'));
const Citizenship = lazy(() => import('@/pages/masterfile/general-setup/citizenship'));
const City = lazy(() => import('@/pages/masterfile/general-setup/city'));
const CivilStatus = lazy(() => import('@/pages/masterfile/general-setup/civil-status'));
const Country = lazy(() => import('@/pages/masterfile/general-setup/country'));
const EmploymentType = lazy(() => import('@/pages/masterfile/general-setup/employment-type'));
const Language = lazy(() => import('@/pages/masterfile/general-setup/language'));
const LicenseType = lazy(() => import('@/pages/masterfile/general-setup/license-type'));
const MembershipType = lazy(() => import('@/pages/masterfile/general-setup/membership-type'));
const Nationality = lazy(() => import('@/pages/masterfile/general-setup/nationality'));

// Todo: fix the foler from PositionType to position-type
const PositionType = lazy(() => import('@/pages/masterfile/general-setup/position-type'));

const Prefix = lazy(() => import('@/pages/masterfile/general-setup/prefix'));
const Province = lazy(() => import('@/pages/masterfile/general-setup/province'));
const Region = lazy(() => import('@/pages/masterfile/general-setup/region'));
const RegionProvinceCity = lazy(() => import('@/pages/masterfile/general-setup/region-province-city'));
const Religion = lazy(() => import('@/pages/masterfile/general-setup/religion'));
const Requirements = lazy(() => import('@/pages/masterfile/general-setup/requirements'));
const School = lazy(() => import('@/pages/masterfile/general-setup/school'));
const Skill = lazy(() => import('@/pages/masterfile/general-setup/skill'));
const Suffix = lazy(() => import('@/pages/masterfile/general-setup/suffix'));
const Violation = lazy(() => import('@/pages/masterfile/general-setup/violation'));

const GeneralSetupRoutes = () => {
	return (
		<>
			<Route path='/masterfile/general-setup/area' element={<Area />} />
			<Route path='/masterfile/general-setup/award' element={<Award />} />
			<Route path='/masterfile/general-setup/blood-type' element={<BloodType />} />
			<Route path='/masterfile/general-setup/citizenship' element={<Citizenship />} />
			<Route path='/masterfile/general-setup/city' element={<City />} />
			<Route path='/masterfile/general-setup/civil-status' element={<CivilStatus />} />
			<Route path='/masterfile/general-setup/country' element={<Country />} />
			<Route path='/masterfile/general-setup/employment-type' element={<EmploymentType />} />
			<Route path='/masterfile/general-setup/language' element={<Language />} />
			<Route path='/masterfile/general-setup/license-type' element={<LicenseType />} />
			<Route path='/masterfile/general-setup/membership-type' element={<MembershipType />} />
			<Route path='/masterfile/general-setup/nationality' element={<Nationality />} />
			<Route path='/masterfile/general-setup/position-type' element={<PositionType />} />
			<Route path='/masterfile/general-setup/prefix' element={<Prefix />} />
			<Route path='/masterfile/general-setup/province' element={<Province />} />
			<Route path='/masterfile/general-setup/region' element={<Region />} />
			<Route path='/masterfile/general-setup/region-province-city' element={<RegionProvinceCity />} />
			<Route path='/masterfile/general-setup/religion' element={<Religion />} />
			<Route path='/masterfile/general-setup/requirements' element={<Requirements />} />
			<Route path='/masterfile/general-setup/school' element={<School />} />
			<Route path='/masterfile/general-setup/skill' element={<Skill />} />
			<Route path='/masterfile/general-setup/suffix' element={<Suffix />} />
			<Route path='/masterfile/general-setup/violation' element={<Violation />} />
		</>
	);
};

export default GeneralSetupRoutes;