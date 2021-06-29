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


import * as runtime from '../runtime';
import {
    CategoriesResponse,
    CategoriesResponseFromJSON,
    CategoriesResponseToJSON,
    NewShiftsResponse,
    NewShiftsResponseFromJSON,
    NewShiftsResponseToJSON,
    PopularShiftsResponse,
    PopularShiftsResponseFromJSON,
    PopularShiftsResponseToJSON,
    ShiftCategoryResponse,
    ShiftCategoryResponseFromJSON,
    ShiftCategoryResponseToJSON,
} from '../models';

export interface CategoriesRequest {
    maximum: number;
}

export interface CategoryRequest {
    categoryName: string;
}

/**
 * 
 */
export class CategoryApi extends runtime.BaseAPI {

    /**
     * The new shifts to display on the home page.
     */
    async _newRaw(): Promise<runtime.ApiResponse<NewShiftsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/shift/category/new`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NewShiftsResponseFromJSON(jsonValue));
    }

    /**
     * The new shifts to display on the home page.
     */
    async _new(): Promise<NewShiftsResponse> {
        const response = await this._newRaw();
        return await response.value();
    }

    /**
     * The shifts for the queried category to display on the home page.
     */
    async categoriesRaw(requestParameters: CategoriesRequest): Promise<runtime.ApiResponse<CategoriesResponse>> {
        if (requestParameters.maximum === null || requestParameters.maximum === undefined) {
            throw new runtime.RequiredError('maximum','Required parameter requestParameters.maximum was null or undefined when calling categories.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/shift/category/categories/{maximum}`.replace(`{${"maximum"}}`, encodeURIComponent(String(requestParameters.maximum))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoriesResponseFromJSON(jsonValue));
    }

    /**
     * The shifts for the queried category to display on the home page.
     */
    async categories(requestParameters: CategoriesRequest): Promise<CategoriesResponse> {
        const response = await this.categoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * The shifts for the queried category to display on the home page.
     */
    async categoryRaw(requestParameters: CategoryRequest): Promise<runtime.ApiResponse<ShiftCategoryResponse>> {
        if (requestParameters.categoryName === null || requestParameters.categoryName === undefined) {
            throw new runtime.RequiredError('categoryName','Required parameter requestParameters.categoryName was null or undefined when calling category.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/shift/category/{categoryName}`.replace(`{${"categoryName"}}`, encodeURIComponent(String(requestParameters.categoryName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ShiftCategoryResponseFromJSON(jsonValue));
    }

    /**
     * The shifts for the queried category to display on the home page.
     */
    async category(requestParameters: CategoryRequest): Promise<ShiftCategoryResponse> {
        const response = await this.categoryRaw(requestParameters);
        return await response.value();
    }

    /**
     * The popular shifts to display on the home page.
     */
    async popularRaw(): Promise<runtime.ApiResponse<PopularShiftsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/shift/category/popular`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PopularShiftsResponseFromJSON(jsonValue));
    }

    /**
     * The popular shifts to display on the home page.
     */
    async popular(): Promise<PopularShiftsResponse> {
        const response = await this.popularRaw();
        return await response.value();
    }

}