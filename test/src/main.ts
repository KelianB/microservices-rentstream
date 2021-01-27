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
    const verbose = false;

    console.log("###### Creating user & credentials ######");

    // Create user
    await request(ADMIN_URL + "/users/", "POST", {}, USER, undefined, verbose);

    // Create credentials
    const {status, password} = await request(
        ADMIN_URL + "/credentials/",
        "POST",
        {},
        {consumerId: USER.username, type: "basic-auth"},
        undefined,
        verbose,
    );

    if (status === 200) {
        return Buffer.from(`${USER.username}:${password}`).toString("base64");
    }
    return null;
}

async function test(): Promise<string | null> {
    const authKey = await createAndAuthenticateUser();
    if (authKey) {
        console.log("Authentication key:", authKey);
        const movie = await getRandomMovie();

        console.log("###### Testing service: pricing ######");

        console.log(`Setting price to 20$ for movie '${movie.title}'`);
        await setMoviePrice(authKey, movie.id, 20);

        console.log(`Setting price to 10$ for '${movie.title}'`);
        await setMoviePrice(authKey, movie.id, 10);

        console.log("Verifying price...");
        let resp = await getPrice(authKey, movie.id);
        if (resp.status === 200) {
            if (resp.price === 10) console.log("OK");
            else return "The price is incorrect.";
        } else return "An error was raised while fetching the price.";

        console.log("###### Testing service: renting ######");

        console.log(`Renting movie '${movie.title}'`);
        await rentMovie(authKey, movie.id);

        console.log("Verifying rental...");
        resp = await getRentals(authKey);
        if (resp.status === 200) {
            const rentals = resp.rentals as {userId: string; movieId: string}[];
            const rental = rentals.find((r) => r.movieId === movie.id);
            if (rental) console.log("OK");
            else return "Unable to find the rental";
        } else return "An error was raised while fetching rentals.";

        console.log("###### Testing service: streaming ######");

        console.log(`Streaming movie '${movie.title}'`);
        let stream = await streamMovie(authKey, movie.id);
        console.log("Response:", stream);

        const anotherMovie = await getRandomMovie();
        console.log(`Streaming another movie: '${anotherMovie.title}'`);
        stream = await streamMovie(authKey, anotherMovie.id);
        console.log("Response:", stream);

        return null;
    }
    return "Failed to authenticate.";
}

async function getRandomMovie() {
    const {movies} = await request(BASE_URL + "/catalog/", "GET");
    return movies[Math.floor(movies.length * Math.random())];
}

async function rentMovie(authKey: string, movieId: string) {
    const verbose = false;
    return request(BASE_URL + "/renting/rent", "POST", {}, {movieId}, authKey, verbose);
}

async function getRentals(authKey: string) {
    const verbose = false;
    return request(BASE_URL + "/renting/", "GET", {}, {}, authKey, verbose);
}

async function setMoviePrice(authKey: string, movieId: string, price: number) {
    const verbose = false;
    return request(BASE_URL + "/renting/price", "POST", {}, {movieId, price}, authKey, verbose);
}

async function getPrice(authKey: string, movieId: string) {
    const verbose = false;
    return request(BASE_URL + "/renting/price/" + movieId, "GET", {}, {}, authKey, verbose);
}

async function streamMovie(authKey: string, movieId: string) {
    const verbose = false;
    return request(BASE_URL + "/streaming/" + movieId, "GET", {}, {}, authKey, verbose);
}

const err = test();
if (err != null) console.error(err);
