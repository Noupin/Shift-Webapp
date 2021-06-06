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
 * @interface AuthenticatedResponse
 */
export interface AuthenticatedResponse {
    /**
     * 
     * @type {boolean}
     * @memberof AuthenticatedResponse
     */
    authenticated?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthenticatedResponse
     */
    msg?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AuthenticatedResponse
     */
    username?: string | null;
}

export function AuthenticatedResponseFromJSON(json: any): AuthenticatedResponse {
    return AuthenticatedResponseFromJSONTyped(json, false);
}

export function AuthenticatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthenticatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'authenticated': !exists(json, 'authenticated') ? undefined : json['authenticated'],
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
        'username': !exists(json, 'username') ? undefined : json['username'],
    };
}

export function AuthenticatedResponseToJSON(value?: AuthenticatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'authenticated': value.authenticated,
        'msg': value.msg,
        'username': value.username,
    };
}


