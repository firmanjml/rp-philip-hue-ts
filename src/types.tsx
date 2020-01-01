type AlertType = 'none' | 'select' | 'lselect';
type EffectType = 'none' | 'colorloop';

interface LightStates {
    readonly on: boolean;
    readonly bri: number;
    readonly hue: number;
    readonly sat: number;
    readonly xy: number;
    readonly ct: number;
    readonly alert: AlertType;
    readonly effect: EffectType;
    readonly colormode: Array<string>;
    readonly reachable: boolean;
}

interface LightSubTypes {
    readonly state: LightStates;
    readonly type: string;
    readonly name: string;
    readonly modelid: string;
    readonly uniqueid: string;
    readonly manufacturername: string;
    readonly luminaireuniqueid: string;
    readonly swversion: string;
}

export interface LightTypes {
    readonly [key: string]: LightSubTypes;
}

export interface LightUpdateStates {
    on?: boolean;
    bri?: number;
    hue?: number;
    sat?: number;
    xy?: Array<number>;
    ct?: number;
    alert?: AlertType;
    effect?: EffectType;
    transitiontime?: number;
    bri_inc?: number;
    sat_int?: number;
    hue_inc?: number;
    ct_inc?: number;
    xy_inc?: Array<number>;
}

interface SearchLight {
    deviceid: Array<string>;
}

type ColorModeType = 'xy' | 'ct' | 'hs';
type GroupingType = 'LightGroup' | 'Luminaire' | 'LightSource' | 'Room' | 'Entertainment' | 'Zone';

interface GroupStates {
    readonly on: boolean;
    readonly bri: number;
    readonly hue: number;
    readonly sat: number;
    readonly effect: EffectType;
    readonly xy: Array<number>;
    readonly ct: number;
    readonly alert: AlertType;
    readonly colormode: ColorModeType;
}

interface GroupSubTypes {
    readonly name: string;
    readonly type: GroupingType;
    readonly lights: Array<string>;
    readonly action: GroupStates;
    // readonly lastupdated: Date;
}

export interface GroupTypes {
    readonly [key: string]: GroupSubTypes;
}

export interface ConfigurationTypes {
    readonly name: string;
    readonly swupdate: object;
    readonly swupdate2: object;
    readonly whitelist: object;
    readonly portalstate: object;
    readonly apiversion: string;
    readonly swversion: string;
    readonly proxyaddress: string;
    readonly proxyport: number;
    readonly linkbutton: boolean;
    readonly ipaddress: string;
    readonly mac: string;
    readonly netmask: string;
    readonly gateway: string;
    readonly dhcp: boolean;
    readonly portalservices: boolean;
    readonly UTC: string;
    readonly localtime: string;
    readonly timezone: string;
    readonly zigbeechannel: number;
    readonly modelid: string;
    readonly bridgeid: string;
    readonly factorynew: boolean;
    readonly replacesbridgeid: string;
    readonly datastoreversion: string;
    readonly starterkitid: string;
    username?: string;
}

interface CreateUserSubType {
    readonly username: string;
}

export interface CreateUserType {
    readonly success: CreateUserSubType
}

export interface BridgePairedType {
    readonly ip: string;
    readonly id: string;
}
