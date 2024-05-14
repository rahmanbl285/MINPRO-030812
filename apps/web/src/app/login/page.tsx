import LoginForm from "@/components/LoginForm";
import Wrapper from "@/components/wrapper";
  
export default function RegisterPage() {
    return (
        <Wrapper>
            <div className="flex justify-center w-full ">
                <LoginForm/>
            </div>
        </Wrapper>
    )
}