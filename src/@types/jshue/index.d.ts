declare module 'jshue' {

    type AlertType = 'none' | 'select' | 'lselect';
    type EffectType = 'none' | 'colorloop';
    type ColorType = 'hs' | 'xy' | 'ct';

    /** Light Type */
    interface PointSymbolType {
        [key: string]: string;
    }

    interface LightState {
        on?: boolean;
        bri?: number;
        hue?: number;
        sat?: number;
        xy?: Array<number>;
        ct?: number;
        alert?: AlertType;
        effect?: EffectType;
        color?: colorType;
        reachable?: boolean;
    }

    interface LightResponseConfig {
        state: LightState;
        type: string;
        name: string;
        modelid: string;
        swversion: string;
        uniqueid: string;
        pointsymbol: PointSymbolType;
    }

    // [
    //     {"success":{"/lights/1/state/bri":200}},
    //     {"success":{"/lights/1/state/on":true}},
    //     {"success":{"/lights/1/state/hue":50000}}
    // ]
    interface LightUpdateResponseType {
        success: {
            [key: string]: any
        };
    }

    interface LightsResponseType {
        [key: string]: LightResponseConfig;
    }

    // {
    //     "7": {"name": "Hue Lamp 7"},
    //     "8": {"name": "Hue Lamp 8"},
    //     "lastscan": "2012-10-29T12:00:00"
    // }
    interface LightNewResponseType {
        [key: string]: {
            name: string;
        };
        lastscan: string;
    }

    interface LightSearchBodyType {
        deviceid: Array<string>
    }

    //[ { "success": { "/lights": "Searching for new devices" }}]
    interface LightSearchResponseType {
        success: {
            [key: string]: string;
        }
    }

    interface DeleteLightResponseType {
        success: {
            [key: string]: string;
        }
    }

    // [
    //     {"success":{"/lights/1/state/bri":200}},
    //     {"success":{"/lights/1/state/on":true}},
    //     {"success":{"/lights/1/state/hue":50000}}
    // ]
    interface LightUpdateAtrResponseType {
        success: {
            [key: string]: any;
        }
    }

    interface LightUpdateAtrBodyType {
        name: string;
    }


    /** Group Types */
    interface GroupState {
        on?: boolean;
        bri?: number;
        hue?: number;
        sat?: number;
        xy?: Array<number>;
        ct?: number;
        effect?: EffectType;
        colormode?: ColorType;
    }

    interface GroupsResponseConfig {
        action: GroupState;
        light: Array<string>;
        name: string;
    }

    interface GroupsResponseType {
        [key: string]: GroupConfig;
    }

    //[{"success": "/groups/1 deleted."}]
    interface GroupDeleteResponseType {
        // [index: number]: {

        // }
        success: string;
    }

    //[{"success":{"id":"1"}}]
    interface GroupCreateResponseType {
        [key: string]: {
            success: {
                id: string;
            };
        };
    }

    // {"name":"Bedroom","lights":["1"]}
    interface GroupUpdateAtrBodyType {
        name?: string;
        light?: Array<string>;
    }

    interface GroupCreateBodyType {
        lights: Array<string>;
        name: string;
        type: string;
    }

    /** Configuration Type */
    //[{"success":{"username": "83b7780291a6ceffbe0bd049104df"}}]    
    interface CreateUserResponseType {
        // [index: number]: {

        // };
        success: {
            username: string;
        }

    }

    // [{ "success": "/config/whitelist/1234567890 deleted." }]
    interface DeleteUserResponseType {
        success: string;
    }

    interface ConfigurationBodyType {
        name: string;
    }

    //[{"success":{"/config/name":"My bridge"}}]
    interface SetConfigurationResponseType {
        success: {
            [key: string]: string;
        };
    }

    interface GetConfiurationResponseType {
        name: string;
        mac: string;
        bridgeid: string;
        modelid: string;
        dhcp: boolean;
        ipaddress: string;
        netmask: string;
        gateway: string;
        proxyaddress: string;
        proxyport: number;
        UTC: string;
        whitelist: {
            [key: string]: {
                "last use date": string;
                "create date": string;
                name: string;
            }
        };
        swversion: string;
        swupdate: {
            updatestate: number;
            url: string;
            text: string;
            notify: boolean;
        };
        linkbutton: boolean;
        portalservices: boolean;
    }

    /** Search Bridge Type **/
    interface SearchNUPNPType {
        id: string;
        internalipaddress: string;
    }

    /** Capabilities */
    interface CapabilitiesResponseType {
        lights: {
            available: number;
        };
        sensors: {
            available: number;
            clip: {
                available: number;
            };
            zll: {
                available: number;
            };
            zgp: {
                available: number;
            };
        };
        groups: {
            available: number;
            total: number;
        };
        scene: {
            available: number;
            lightstates: {
                available: number;
            };
        };
        rules: any;
        schedules: any;
        resourcelinks: any;
        whitelists: any;
        timezones: any;
    }

    /** Schedule */
    //[
    //{"success": "/schedules/1 deleted."}
    //]
    interface ScheduleDeleteResponseType {
        success: string;
    }

    // [
    //     { "success": {"/schedules/1/name": "Wake up"}}
    // ]
    interface ScheduleUpdateResponseType {
        success: {
            [key: string]: string
        };
    }

    // {
    //     "name": "Wake up",
    //     "description": "My wake up alarm",
    //     "command": {
    //         "address": "/api/<username>/groups/1/action",
    //         "method": "PUT",
    //         "body": {
    //             "on": true
    //         }
    //     },
    //     "time": "W124/T06:00:00"
    // }
    interface ScheduleResponseConfig {
        name: string;
        description: string;
        command: {
            address: string;
            method: string;
            body: {
                on: boolean;
            };
        };
        time: string;
    }

    interface ScheduleResponseType {
        [key: string]: ScheduleResponseConfig
    }

    // [{
    //     "success":{"id": "2"}
    // }]
    interface ScheduleCreateResponseType {
        success: {
            id: string;
        }
    }

    interface ScheduleCreateBodyType {
        name?: string;
        description?: string;
        command: string;
        time: string;
        status?: 'enabled' | 'disabled';
        localtime: string;
        status?: string;
        autodelete?: boolean;
        recycle?: boolean;
    }

    interface ScheduleUpdateBodyType {
        name?: string;
        description?: string;
        command?: string;
        time?: string;
        localtime?: string;
        status?: string;
        autodelete?: boolean;
    }

    interface IControlType {
        getCapabilities: () => Promise<CapabilitiesResponseType>;

        deleteUser: (username: string) => Promise<Array<DeleteUserResponseType>>;
        setConfig: (data: ConfigurationBodyType) => Promise<Array<SetConfigurationResponseType>>;
        getConfig: () => Promise<GetConfiurationResponseType>;
        getFullState: () => Promise<any>;

        getLights: () => Promise<LightsResponseType>;
        getNewLights: () => Promise<LightNewResponseType>;
        searchForNewLights: (data?: LightSearchBodyType) => Promise<Array<LightSearchResponseType>>;
        getLight: (id: string) => Promise<LightResponseConfig>;
        setLight: (id: string, data: LightUpdateAtrBodyType) => Promise<Array<LightUpdateAtrResponseType>>;
        setLightState: (id: string, data: LightState) => Promise<Array<LightUpdateResponseType>>;
        deleteLight: (id: string) => Promise<Array<DeleteLightResponseType>>;

        getGroups: () => Promise<GroupsResponseType>;
        createGroup: (data: GroupCreateBodyType) => Promise<GroupCreateResponseType>;
        getGroup: (id: string) => Promise<GroupsResponseConfig>;
        setGroup: (id: string, data: GroupUpdateAtrBodyType) => Promise<GroupsResponseConfig>;
        setGroupState: (id: string, data: GroupState) => Promise<GroupsResponseConfig>;
        deleteGroup: (id: string) => Promise<Array<GroupDeleteResponseType>>;

        getSchedules: () => Promise<ScheduleResponseType>;
        createSchedule: (data: ScheduleCreateBodyType) => Promise<Array<ScheduleCreateResponseType>>;
        getSchedule: (id: string) => Promise<ScheduleResponseConfig>;
        setSchedule: (id: string, data: ScheduleUpdateBodyType) => Promise<Array<ScheduleUpdateResponseType>>;
        deleteSchedule: (di: string) => Promise<Array<ScheduleDeleteResponseType>>;
        scheduleCommandGenerator: () => object;
    }

    interface IBridgeType {
        createUser: (type: string) => Promise<Array<CreateUserResponseType>>;
        user: (username: string) => IControlType;
    }

    export interface IHueType {
        discover: () => Promise<Array<SearchNUPNPType>>;
        bridge: (ip: string) => IBridgeType;
    }
    var jsHue = jsHueAPI.bind(null, fetch, Response, JSON, Promise);
    export default jsHue;
}