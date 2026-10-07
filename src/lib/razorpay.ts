// src/lib/razorpay.ts
import Razorpay from "razorpay";

export const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_mockKeyId123";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "mockSecretKey456";

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};
