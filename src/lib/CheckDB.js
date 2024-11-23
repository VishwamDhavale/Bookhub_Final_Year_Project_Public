import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { db } from "./db"


const CheckDB = async () => {
    const session = await getServerSession(authOptions)

    try {
        const check = await db.RecommendedBook.findMany({
            where: {
                userId: session?.user.id
            }
        })
        if (check) {
            return true
        }
        return false
    } catch (error) {
        console.log("error at check genre", error)

    }
}

export default CheckDB