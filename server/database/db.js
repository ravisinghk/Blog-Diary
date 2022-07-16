// connection with database

import mongoose from "mongoose";

const Connection = async (username, password) => {
    const Url = `mongodb+srv://${username}:${password}@blogappdb.6ivqd.mongodb.net/?retryWrites=true&w=majority`

    try {
        await mongoose.connect(Url, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Database Connected Successfully')

    } catch (error) {
        console.log("Error Connecting to the DATABASE ", error.message)
    }

}

export default Connection