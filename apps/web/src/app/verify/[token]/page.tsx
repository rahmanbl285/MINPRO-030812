"use client";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/wrapper";
import { useParams } from "next/navigation";

export default function VerifyPage() {
    const params = useParams();
    const router = useRouter();
    
    const handleVerify = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/users/verify', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${params.token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data);
                alert("Verify Success!");
                router.push("/"); // Redirect to the home page
            } else {
                console.log(data);
                alert("Verification failed. Please try again.");
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-putih w-full h-screen pt-36 flex justify-center items-center">
            <div className="w-96 p-6 shadow-lg rounded-md">
            <h2 className="mb-3 text-3xl block text-center text-birutua font-bold">Verification</h2>
            <p className="p-2 text-center pt-28 text-birutua  mb-6">Please verify your account !</p>
             <div className="pt-28">
             <button onClick={handleVerify} className="bg-birutua text-putih font-bold w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
             Verify
             </button>
             </div>
             </div>
        </div>
    );
}
