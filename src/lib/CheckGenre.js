import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

const CheckGenre = async () => {
    const session = await getServerSession(authOptions)
    try {
        const check = await db.UserGenre.findOne({
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
export default CheckGenre