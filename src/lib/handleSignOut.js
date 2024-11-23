import { signOut } from "next-auth/react";
import axios from "axios";

export const handleSignOut = async () => {
    try {
        // Step 1: Sign out the user
        // await signOut({
        //   redirect: false, // Avoid automatic redirection
        // });

        // Step 2: Update the database
        const response = await axios.get("/api/auth/updatesession");

        console.log("Signout response:", response.data.message);

        if (response.status === 200) {
            // Handle success
            await signOut({
                redirect: true, // Avoid automatic redirection,
                callbackUrl: "/auth/login",
            });

            // router.refresh();
            // router.push("/auth/login");
        } else {
            console.log("signout error");
        }
    } catch (error) {
        console.error("Error during signout:", error);
        // Handle error
    }
};