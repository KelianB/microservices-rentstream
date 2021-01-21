import {fetch} from "cross-fetch";

// Request-related types
type Primitive = string | number | boolean | Primitive[] | undefined;
type URLParams = {[key: string]: Primitive};
type URLBodyParams = {[key: string]: Primitive | Primitive[] | URLBodyParams | URLBodyParams[]};

function encodeURIPrimitive(v: Primitive): string {
    return Array.isArray(v)
        ? v.map((v) => encodeURIPrimitive(v)).join(",")
        : encodeURIComponent(v as string | number | boolean);
}

/**
 * Encode parameters for an HTTP request (e.g. param1=value1&param2=value2)
 * @param args - A map that contains argument keys and associated values.
 * @returns the given arguments, formatted into a HTTP request suffix.
 */
export function encodeRequestParams(args: URLParams): string {
    const str = Object.keys(args)
        .filter((key: string) => args[key] !== undefined)
        .map((key: string) => `${key}=${encodeURIPrimitive(args[key])}`)
        .join("&");
    return str.length == 0 ? str : "?" + str;
}

/**
 * Send a request to the backend.
 * @param url - The URL on which to send the request
 * @param method - Which HTTP method to use (GET, PUT, POST, ...)
 * @param params - The URL parameters (?param1=value1&param2=value2 ...)
 * @param body - The body of the request.
 * @param authKey - An authentication key.
 * @param verbose - Whether or not to print information about the request and response.
 */
export async function request(
    url: string,
    method = "GET",
    params: URLParams = {},
    body: URLBodyParams = {},
    authKey: string | undefined = undefined,
    verbose = false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any & {status: number}> {
    const headers: {[key: string]: string} = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    if (authKey !== undefined) headers.Authorization = `Basic ${authKey}`;

    const formattedParams = encodeRequestParams(params);
    let response: Response | null = null;

    try {
        if (verbose) {
            console.log(`Sending request: ${method} ${url}${formattedParams}`);
            console.log(`  headers: ${JSON.stringify(headers)}`);
            console.log(`  body   : ${JSON.stringify(body)}`);
        }

        response = await fetch(`${url}${formattedParams}`, {
            method,
            headers,
            ...(method == "GET" ? {} : {body: JSON.stringify(body)}),
        });

        const json = {status: response.status, ...(await response.json())};
        //if (response.status !== HttpStatusCode.NO_CONTENT) json = {...json, ...(await response.json())};

        if (verbose) {
            console.log(`Response from ${url}:`);
            console.log(json);
        }

        return json;
    } catch (error) {
        console.error(
            `An unexpected error occured with a request to ${url}. ` +
                `Method = ${method}, authKey = ${authKey}, params=${JSON.stringify(params)}, ` +
                `body=${JSON.stringify(body)}`,
        );
        console.error(error);
        console.error("Response received from server:", response);
        return {errorType: "error.unknown", status: 400};
    }
}
