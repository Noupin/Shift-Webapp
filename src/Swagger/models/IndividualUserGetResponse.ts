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
import {
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface IndividualUserGetResponse
 */
export interface IndividualUserGetResponse {
    /**
     * 
     * @type {User}
     * @memberof IndividualUserGetResponse
     */
    shift?: User;
}

export function IndividualUserGetResponseFromJSON(json: any): IndividualUserGetResponse {
    return IndividualUserGetResponseFromJSONTyped(json, false);
}

export function IndividualUserGetResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): IndividualUserGetResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'shift': !exists(json, 'shift') ? undefined : UserFromJSON(json['shift']),
    };
}

export function IndividualUserGetResponseToJSON(value?: IndividualUserGetResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'shift': UserToJSON(value.shift),
    };
}


