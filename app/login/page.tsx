import Link from 'next/link'
import {Button} from "@/components/ui/button"

export default function LoginPage() {
  return (
    <>
      <h1>Login</h1>
      <Link href="/" replace>
        <Button>
          Add music
        </Button>
      </Link>
    </>
  );
}
