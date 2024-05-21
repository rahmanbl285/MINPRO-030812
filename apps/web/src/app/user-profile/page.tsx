import MainProfile from "@/components/profile-all/MainProfile";
import Wrapper from "@/components/wrapper";
  
export default function MainProfilePage() {
    return (
        <div className="pt-28 bg-putih">

            <Wrapper>
                <div className="flex justify-center w-full ">
                    <MainProfile/>
                </div>
            </Wrapper>
        </div>
    )
}