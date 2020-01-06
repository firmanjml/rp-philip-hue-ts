import axios, { AxiosInstance } from 'axios';
import { LightTypes, LightUpdateStates, ConfigurationTypes, LightSubTypes, GroupTypes, GroupSubTypes, CreateUserType, CreateUser } from './types';

interface IControlAPI {
    getCapabilities: () => Promise<any>;
    deleteUser: (username: string) => Promise<any>;
    setConfig: (data: object) => Promise<any>;
    getConfig: () => Promise<ConfigurationTypes>;
    getFullState: () => Promise<any>;
    getLights: () => Promise<LightTypes>;
    getNewLights: () => Promise<any>;
    searchForNewLights: (data?: object) => Promise<any>;
    getLight: (id: string) => Promise<LightSubTypes>;
    setLight: (id: string) => Promise<LightSubTypes>;
    setLightState: (id: string, data: LightUpdateStates) => Promise<any>;
    deleteLight: (id: string) => Promise<any>;
    getGroups: () => Promise<GroupTypes>;
    createGroup: (data: object) => Promise<any>;
    getGroup: (id: string) => Promise<GroupSubTypes>;
    setGroup: (id: string, data: object) => Promise<any>;
    setGroupState: (id: string, data: object) => Promise<any>;
    deleteGroup: (id: string) => Promise<any>;
}

interface IBridgeAPI {
    createUser: (type: string) => Promise<CreateUser>;
    user: (username: string) => IControlAPI;
}

interface IHueAPI {
    discover: () => Promise<any>;
    bridge: (ip: string) => IBridgeAPI;
}

var jsHueAPI = (axios, Response, JSON, Promise): IHueAPI => {
    var _requestJson = (method, url, data) =>
        (new Promise(resolve => {
            if (data !== null) {
                data = JSON.stringify(data);
            }
            resolve(data);
        }))
            .then(data => axios({ url, method, data }))
            .then(response => response.data);

    /**
     * Performs fetch request with JSON (no body).
     *
     * @method _requestJsonUrl
     * @private
     * @param {String} method GET, PUT, POST, or DELETE
     * @param {String} url request URL
     * @return {Promise} promise resolving to response data object
     */
    var _requestJsonUrl = (method, url) => _requestJson(method, url, null);

    /**
     * Performs fetch GET.
     *
     * @method _get
     * @private
     * @param {String} url request URL
     * @return {Promise} promise resolving to response data object
     */
    var _get = _requestJsonUrl.bind(null, 'GET');

    /**
     * Performs fetch PUT.
     *
     * @method _put
     * @private
     * @param {String} url request URL
     * @param {Object} data request data object
     * @return {Promise} promise resolving to response data object
     */
    var _put = _requestJson.bind(null, 'PUT');

    /**
     * Performs fetch POST.
     *
     * @method _post
     * @private
     * @param {String} url request URL
     * @param {Object} data request data object
     * @return {Promise} promise resolving to response data object
     */
    var _post = _requestJson.bind(null, 'POST');

    /**
     * Performs fetch DELETE.
     *
     * @method _delete
     * @private
     * @param {String} url request URL
     * @return {Promise} promise resolving to response data object
     */
    var _delete = _requestJsonUrl.bind(null, 'DELETE');

    /**
     * Creates a parametrized fetch request function.
     *
     * The given request URL generator function should generate a request URL from
     * a single input parameter. For example:
     *
     * (id) => { return `http://path/to/resource/${id}`; }
     *
     * The returned parametrized request function takes this same input parameter
     * plus the remaining parameters of the given request function. For example, a
     * parametrized _get or _delete will have the following signature:
     *
     * (id)
     *
     * A parametrized _put or _post will have the following signature:
     *
     * (id, data)
     *
     * These functions will make appropriate requests to the URLs generated from the
     * first input parameter.
     *
     * @method _parametrize
     * @private
     * @param {Function} method request function (_get, _put, _post, or _delete)
     * @param {Function} url request URL generator function
     * @return {Function} parametrized request function
     */
    var _parametrize = (method, url) => (p, ...rest) => method(url(p), ...rest);

    /**
     * Creates an echo.
     *
     * The returned function acts as a fetch implementation which just echoes back
     * the request. This is used for schedule command and rule action generation.
     *
     * @method _echo
     * @private
     * @param {String} baseUrl base URL to strip out
     * @return {Function} echo fetch implementation
     */
    var _echo = baseUrl => (url, data) => Promise.resolve(new Response(JSON.stringify({
        address: url.slice(baseUrl.length),
        method: data.method,
        body: JSON.parse(data.body)
    })));

    return {
        /* ================================================== */
        /* Portal API                                         */
        /* ================================================== */

        /**
         * Discovers local bridges.
         *
         * @method discover
         * @return {Promise} promise resolving to response data object
         */
        discover: _get.bind(null, 'https://www.meethue.com/api/nupnp'),
        /**
         * Creates bridge object (jsHueBridge).
         *
         * @method bridge
         * @param {String} ip ip address or hostname of bridge
         * @return {Object} bridge object
         */
        bridge: (ip: string) => {
            /**
             * @class jsHueBridge
             */
            var _baseUrl = `http://${ip}`,
                _bridgeUrl = `${_baseUrl}/api`;

            return {
                /**
                 * Creates new user in bridge whitelist.
                 *
                 * @method createUser
                 * @param {String} type device type
                 * @return {Promise} promise resolving to response data object
                 */
                createUser: (type: string) => _post(_bridgeUrl, { devicetype: type }),
                /**
                 * Creates user object (jsHueUser).
                 *
                 * @method user
                 * @param {String} username username
                 * @return {Object} user object
                 */
                user: (username: string): IControlAPI => {
                    /**
                     * @class jsHueUser
                     */
                    var _userUrl = `${_bridgeUrl}/${username}`,
                        _capabilitiesUrl = `${_userUrl}/capabilities`,
                        _configUrl = `${_userUrl}/config`,
                        _lightsUrl = `${_userUrl}/lights`,
                        _groupsUrl = `${_userUrl}/groups`,
                        _schedulesUrl = `${_userUrl}/schedules`,
                        _scenesUrl = `${_userUrl}/scenes`,
                        _sensorsUrl = `${_userUrl}/sensors`,
                        _rulesUrl = `${_userUrl}/rules`,
                        _linksUrl = `${_userUrl}/resourcelinks`;

                    var _objectUrl = baseUrl => id => `${baseUrl}/${id}`;

                    var _lightUrl = _objectUrl(_lightsUrl),
                        _groupUrl = _objectUrl(_groupsUrl),
                        _scheduleUrl = _objectUrl(_schedulesUrl),
                        _sceneUrl = _objectUrl(_scenesUrl),
                        _sensorUrl = _objectUrl(_sensorsUrl),
                        _ruleUrl = _objectUrl(_rulesUrl),
                        _linkUrl = _objectUrl(_linksUrl);

                    return {
                        /* ================================================== */
                        /* Capabilities API                                   */
                        /* ================================================== */

                        /**
                         * Gets bridge capabilities.
                         *
                         * @method getCapabilities
                         * @return {Promise} promise resolving to response data object
                         */
                        getCapabilities: _get.bind(null, _capabilitiesUrl),

                        /* ================================================== */
                        /* Configuration API                                  */
                        /* ================================================== */

                        /**
                         * Deletes user from bridge whitelist.
                         *
                         * @method deleteUser
                         * @param {String} username username
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteUser: _parametrize(_delete, username => `${_configUrl}/whitelist/${username}`),
                        /**
                         * Gets bridge configuration.
                         *
                         * @method getConfig
                         * @return {Promise} promise resolving to response data object
                         */
                        getConfig: _get.bind(null, _configUrl),
                        /**
                         * Sets bridge configuration.
                         *
                         * @method setConfig
                         * @param {Object} data config data
                         * @return {Promise} promise resolving to response data object
                         */
                        setConfig: _put.bind(null, _configUrl),
                        /**
                         * Gets bridge full state.
                         *
                         * @method getFullState
                         * @return {Promise} promise resolving to response data object
                         */
                        getFullState: _get.bind(null, _userUrl),

                        /* ================================================== */
                        /* Lights API                                         */
                        /* ================================================== */

                        /**
                         * Gets lights.
                         *
                         * @method getLights
                         * @return {Promise} promise resolving to response data object
                         */
                        getLights: _get.bind(null, _lightsUrl),
                        /**
                         * Gets new lights.
                         *
                         * @method getNewLights
                         * @return {Promise} promise resolving to response data object
                         */
                        getNewLights: _get.bind(null, `${_lightsUrl}/new`),
                        /**
                         * Searches for new lights.
                         *
                         * @method searchForNewLights
                         * @param {Object} data data (optional)
                         * @return {Promise} promise resolving to response data object
                         */
                        searchForNewLights: (data = null) => _post(_lightsUrl, data),
                        /**
                         * Gets light attributes and state.
                         *
                         * @method getLight
                         * @param {Number} id light ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getLight: _parametrize(_get, _lightUrl),
                        /**
                         * Sets light attributes.
                         *
                         * @method setLight
                         * @param {Number} id light ID
                         * @param {Object} data attribute data
                         * @return {Promise} promise resolving to response data object
                         */
                        setLight: _parametrize(_put, _lightUrl),
                        /**
                         * Sets light state.
                         *
                         * @method setLightState
                         * @param {Number} id light ID
                         * @param {Object} data state data
                         * @return {Promise} promise resolving to response data object
                         */
                        setLightState: _parametrize(_put, id => `${_lightUrl(id)}/state`),
                        /**
                         * Deletes a light.
                         *
                         * @method deleteLight
                         * @param {Number} id light ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteLight: _parametrize(_delete, _lightUrl),

                        /* ================================================== */
                        /* Groups API                                         */
                        /* ================================================== */

                        /**
                         * Gets groups.
                         *
                         * @method getGroups
                         * @return {Promise} promise resolving to response data object
                         */
                        getGroups: _get.bind(null, _groupsUrl),
                        /**
                         * Creates a group.
                         *
                         * @method createGroup
                         * @param {Object} data group data
                         * @return {Promise} promise resolving to response data object
                         */
                        createGroup: _post.bind(null, _groupsUrl),
                        /**
                         * Gets group attributes.
                         *
                         * @method getGroup
                         * @param {Number} id group ID
                         * @return {Promise} promise resolving to response data object
                         */
                        getGroup: _parametrize(_get, _groupUrl),
                        /**
                         * Sets group attributes.
                         *
                         * @method setGroup
                         * @param {Number} id group ID
                         * @param {Object} data attribute data
                         * @return {Promise} promise resolving to response data object
                         */
                        setGroup: _parametrize(_put, _groupUrl),
                        /**
                         * Sets group state.
                         *
                         * @method setGroupState
                         * @param {Number} id group ID
                         * @param {Object} data state data
                         * @return {Promise} promise resolving to response data object
                         */
                        setGroupState: _parametrize(_put, id => `${_groupUrl(id)}/action`),
                        /**
                         * Deletes a group.
                         *
                         * @method deleteGroup
                         * @param {Number} id group ID
                         * @return {Promise} promise resolving to response data object
                         */
                        deleteGroup: _parametrize(_delete, _groupUrl),
                    };
                }
            };
        }
    };
};

var hueAPI = jsHueAPI.bind(null, axios, Response, JSON, Promise);
var hue: IHueAPI = hueAPI();

export default hue;