import {request} from "./utils";

const USER = {
    username: `test${Math.round(Math.random() * 1000)}@test.com`,
    firstname: "Steve",
    lastname: "Brown",
    birthdate: "1984-11-01",
};

const ADMIN_URL = "http://localhost:9876";
const BASE_URL = "http://localhost:8080";

async function createAndAuthenticateUser(): Promise<string | null> {
    // Create user
    console.log("###### Creating user ######");
    await request(ADMIN_URL + "/users/", "POST", {}, USER, undefined, true);

    // Create credentials
    console.log("###### Creating credentials ######");
    const {status, password} = await request(
        ADMIN_URL + "/credentials/",
        "POST",
        {},
        {consumerId: USER.username, type: "basic-auth"},
        undefined,
        true,
    );

    if (status === 200) {
        const key = USER.username + ":" + password;
        return Buffer.from(key).toString("base64");
    }
    return null;
}

async function getRandomMovie() {
    const {movies} = await request(BASE_URL + "/catalog/", "GET");
    return movies[Math.floor(movies.length * Math.random())];
}

async function rentMovie(authKey: string, movieId: string) {
    return request(BASE_URL + "/renting/rent", "POST", {}, {movieId}, authKey, true);
}

async function test(): Promise<void> {
    const authKey = await createAndAuthenticateUser();
    if (authKey) {
        const movie = await getRandomMovie();
        console.log(movie);
        await rentMovie(authKey, movie.id);
    }
}

test();
