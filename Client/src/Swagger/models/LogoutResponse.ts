/* tslint:disable */
/* eslint-disable */
/**
 * Shift
 * Shift Server API documentation
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LogoutResponse
 */
export interface LogoutResponse {
    /**
     * 
     * @type {string}
     * @memberof LogoutResponse
     */
    msg?: string | null;
}

export function LogoutResponseFromJSON(json: any): LogoutResponse {
    return LogoutResponseFromJSONTyped(json, false);
}

export function LogoutResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LogoutResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
    };
}

export function LogoutResponseToJSON(value?: LogoutResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'msg': value.msg,
    };
}

