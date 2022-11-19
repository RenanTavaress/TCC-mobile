import { SendEmail } from "../../components/SendEmail";
import react from "react";

export function ForgotPassword() {
	return <SendEmail endPoint="/change/password" />;
}
