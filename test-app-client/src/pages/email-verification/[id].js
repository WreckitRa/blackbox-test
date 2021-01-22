import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CenteredForm from "../../layouts/centered-form";
import { verifyUser } from "../../pages/api/auth";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    try {
      console.log(id);
      const req = await verifyUser(id);
      console.log(req);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <CenteredForm
      title="Account Verification"
      subtitle="Your account has been verified!"
    >
      <div className="w-full mt-2">
        <span>
          <Link href="/login">
            <a className="link">Go back to login</a>
          </Link>
        </span>
      </div>
    </CenteredForm>
  );
};

export default Index;
