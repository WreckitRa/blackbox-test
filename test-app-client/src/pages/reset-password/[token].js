import Link from "next/link";
import CenteredForm from "../../layouts/centered-form";
import ResetPassword from "../../components/sample-forms/reset-password";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <CenteredForm
      title="Reset password"
      subtitle="Please enter your new password to reset your account"
    >
      <ResetPassword token={token} />
      <div className="flex flex-row w-full">
        <span>
          <Link href="/login">
            <a className="link">Go back to login here</a>
          </Link>
        </span>
      </div>
    </CenteredForm>
  );
};

export default Index;
