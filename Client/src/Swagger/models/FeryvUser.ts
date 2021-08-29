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
 * @interface FeryvUser
 */
export interface FeryvUser {
    /**
     * 
     * @type {boolean}
     * @memberof FeryvUser
     */
    admin: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof FeryvUser
     */
    confirmed: boolean;
    /**
     * 
     * @type {string}
     * @memberof FeryvUser
     */
    email: string;
    /**
     * 
     * @type {number}
     * @memberof FeryvUser
     */
    id: number;
    /**
     * 
     * @type {Array<object>}
     * @memberof FeryvUser
     */
    licenses?: Array<object>;
    /**
     * 
     * @type {string}
     * @memberof FeryvUser
     */
    mediaFilename: string;
    /**
     * 
     * @type {string}
     * @memberof FeryvUser
     */
    username: string;
    /**
     * 
     * @type {boolean}
     * @memberof FeryvUser
     */
    verified: boolean;
}

export function FeryvUserFromJSON(json: any): FeryvUser {
    return FeryvUserFromJSONTyped(json, false);
}

export function FeryvUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeryvUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'admin': json['admin'],
        'confirmed': json['confirmed'],
        'email': json['email'],
        'id': json['id'],
        'licenses': !exists(json, 'licenses') ? undefined : json['licenses'],
        'mediaFilename': json['mediaFilename'],
        'username': json['username'],
        'verified': json['verified'],
    };
}

export function FeryvUserToJSON(value?: FeryvUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'admin': value.admin,
        'confirmed': value.confirmed,
        'email': value.email,
        'id': value.id,
        'licenses': value.licenses,
        'mediaFilename': value.mediaFilename,
        'username': value.username,
        'verified': value.verified,
    };
}


