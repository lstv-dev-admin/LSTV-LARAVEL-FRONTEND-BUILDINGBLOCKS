import { IMasterfileEntity } from "@features/masterfile/types";

export interface IRegionProvinceCity extends IMasterfileEntity {
    region_desc: string;
    province_desc: string;
    city_desc: string;
}

