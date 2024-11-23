import { getServerSession } from "next-auth"
import { db } from "./db"
import { authOptions } from "./auth"

const UpdateBooksTodb = async (books) => {
    console.log("Books: at UpdateBookTodb ", books)
    const session = await getServerSession(authOptions)
    try {
        const Response = await db.RecommendedBook.Create({
            data: {
                bookId: books.book_id,
                title: books.title,
                coverImage: books.cover_image,

                userId: session?.user.id
            }
        })
        if (Response) {
            return Response
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}
export default UpdateBooksTodb