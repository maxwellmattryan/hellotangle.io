/**
 * A helper method for asserting property assignability without losing inferred types.
 * @internal
 */
function asRouteConfig<T extends RouteConfig>(arg: T): T {
    return arg;
}

/**
 * The route interface containing the URI of a specific endpoint.
 * @internal
 */
interface Route {
    [endpoint: string]: string
}

/**
 * The route configuration interface containing modules each with their own respective endpoints.
 */
interface RouteConfig {
    [Module: string]: Route
}

const BASE_URL = '/api';

/**
 * The global API endpoint configuration object containing all of the endpoints for the server.
 */
export const Routes = asRouteConfig({
    /**
     * The home endpoints for the API.
     */
    Api: {
        /**
         * The root endpoint for the API.
         */
        root: `${BASE_URL}`
    },

    /**
     * The endpoints for broadcasting messages via the IOTA protocol.
     */
    Messages: {
        /**
         * The root endpoint for handling with messages.
         */
        root: `${BASE_URL}/messages`,

        /**
         * The endpoint for sending messages via the IOTA protocol.
         */
        send: `${BASE_URL}/messages/send`
    }
});
