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
 * @interface Shift
 */
export interface Shift {
    /**
     * 
     * @type {User}
     * @memberof Shift
     */
    author: User;
    /**
     * 
     * @type {string}
     * @memberof Shift
     */
    baseDecoderPath: string;
    /**
     * 
     * @type {string}
     * @memberof Shift
     */
    dateCreated?: string;
    /**
     * 
     * @type {string}
     * @memberof Shift
     */
    encoderPath: string;
    /**
     * 
     * @type {object}
     * @memberof Shift
     */
    id?: object;
    /**
     * 
     * @type {string}
     * @memberof Shift
     */
    maskDecoderPath: string;
    /**
     * 
     * @type {string}
     * @memberof Shift
     */
    mediaFilename?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Shift
     */
    _private?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Shift
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Shift
     */
    uuid: string;
    /**
     * 
     * @type {boolean}
     * @memberof Shift
     */
    verified?: boolean;
    /**
     * 
     * @type {number}
     * @memberof Shift
     */
    views?: number;
}

export function ShiftFromJSON(json: any): Shift {
    return ShiftFromJSONTyped(json, false);
}

export function ShiftFromJSONTyped(json: any, ignoreDiscriminator: boolean): Shift {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'author': UserFromJSON(json['author']),
        'baseDecoderPath': json['baseDecoderPath'],
        'dateCreated': !exists(json, 'dateCreated') ? undefined : json['dateCreated'],
        'encoderPath': json['encoderPath'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'maskDecoderPath': json['maskDecoderPath'],
        'mediaFilename': !exists(json, 'mediaFilename') ? undefined : json['mediaFilename'],
        '_private': !exists(json, 'private') ? undefined : json['private'],
        'title': json['title'],
        'uuid': json['uuid'],
        'verified': !exists(json, 'verified') ? undefined : json['verified'],
        'views': !exists(json, 'views') ? undefined : json['views'],
    };
}

export function ShiftToJSON(value?: Shift | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'author': UserToJSON(value.author),
        'baseDecoderPath': value.baseDecoderPath,
        'dateCreated': value.dateCreated,
        'encoderPath': value.encoderPath,
        'id': value.id,
        'maskDecoderPath': value.maskDecoderPath,
        'mediaFilename': value.mediaFilename,
        'private': value._private,
        'title': value.title,
        'uuid': value.uuid,
        'verified': value.verified,
        'views': value.views,
    };
}


