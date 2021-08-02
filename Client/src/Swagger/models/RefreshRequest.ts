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
 * @interface RefreshRequest
 */
export interface RefreshRequest {
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof RefreshRequest
     */
    csrfRefreshToken?: { [key: string]: object; } | null;
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof RefreshRequest
     */
    refreshTokenCookie?: { [key: string]: object; } | null;
}

export function RefreshRequestFromJSON(json: any): RefreshRequest {
    return RefreshRequestFromJSONTyped(json, false);
}

export function RefreshRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RefreshRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'csrfRefreshToken': !exists(json, 'csrf_refresh_token') ? undefined : json['csrf_refresh_token'],
        'refreshTokenCookie': !exists(json, 'refresh_token_cookie') ? undefined : json['refresh_token_cookie'],
    };
}

export function RefreshRequestToJSON(value?: RefreshRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'csrf_refresh_token': value.csrfRefreshToken,
        'refresh_token_cookie': value.refreshTokenCookie,
    };
}


