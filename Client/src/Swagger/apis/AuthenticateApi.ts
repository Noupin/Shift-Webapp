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
    LoginRequest,
    LoginRequestFromJSON,
    LoginRequestToJSON,
    LoginResponse,
    LoginResponseFromJSON,
    LoginResponseToJSON,
    LogoutResponse,
    LogoutResponseFromJSON,
    LogoutResponseToJSON,
    RefreshResponse,
    RefreshResponseFromJSON,
    RefreshResponseToJSON,
    RegisterRequest,
    RegisterRequestFromJSON,
    RegisterRequestToJSON,
    RegisterResponse,
    RegisterResponseFromJSON,
    RegisterResponseToJSON,
} from '../models';

export interface LoginOperationRequest {
    body?: LoginRequest;
}

export interface RegisterOperationRequest {
    body?: RegisterRequest;
}

/**
 * 
 */
export class AuthenticateApi extends runtime.BaseAPI {

    /**
     * The login for the user.
     */
    async loginRaw(requestParameters: LoginOperationRequest): Promise<runtime.ApiResponse<LoginResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/authenticate/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginResponseFromJSON(jsonValue));
    }

    /**
     * The login for the user.
     */
    async login(requestParameters: LoginOperationRequest): Promise<LoginResponse> {
        const response = await this.loginRaw(requestParameters);
        return await response.value();
    }

    /**
     * Logs the user out.
     */
    async logoutRaw(): Promise<runtime.ApiResponse<LogoutResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/authenticate/logout`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LogoutResponseFromJSON(jsonValue));
    }

    /**
     * Logs the user out.
     */
    async logout(): Promise<LogoutResponse> {
        const response = await this.logoutRaw();
        return await response.value();
    }

    /**
     * Refreshes the users access token.
     */
    async refreshRaw(): Promise<runtime.ApiResponse<RefreshResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/authenticate/refresh`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RefreshResponseFromJSON(jsonValue));
    }

    /**
     * Refreshes the users access token.
     */
    async refresh(): Promise<RefreshResponse> {
        const response = await this.refreshRaw();
        return await response.value();
    }

    /**
     * The regitration for the user.
     */
    async registerRaw(requestParameters: RegisterOperationRequest): Promise<runtime.ApiResponse<RegisterResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/authenticate/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegisterRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RegisterResponseFromJSON(jsonValue));
    }

    /**
     * The regitration for the user.
     */
    async register(requestParameters: RegisterOperationRequest): Promise<RegisterResponse> {
        const response = await this.registerRaw(requestParameters);
        return await response.value();
    }

}
