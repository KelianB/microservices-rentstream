/*
export async function createUser({email, firstName, lastName, dateOfBirth}: CreateQuery<IUser>): Promise<IUser> {
    return User.create({
        email,
        firstName,
        lastName,
        dateOfBirth,
    })
        .then((data: IUser) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}
*/
