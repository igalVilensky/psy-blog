<template>
  <div class="relative h-[80dvh]">
    <div class="container mx-auto max-w-6xl relative z-10 pb-12 pt-12">
      <div
        class="w-full max-w-4xl bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8 mx-auto"
      >
        <h2
          class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-6"
        >
          Verify Your Email
        </h2>
        <p class="text-slate-300 mb-6">
          Please check your inbox for the verification email. If you didn't
          receive the email, click the button below to resend it.
        </p>
        <button
          @click="resendVerificationEmail"
          class="w-full relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group"
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
          >
            <i class="fas fa-envelope"></i>
          </span>
          <span
            class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
          >
            <i class="fas fa-arrow-right mr-2"></i>
            Resend Verification Email
          </span>
          <span class="relative invisible">Resend Verification Email</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, sendEmailVerification } from "firebase/auth";

const resendVerificationEmail = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await sendEmailVerification(user);
      alert("Verification email sent! Check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error.message);
      alert("Failed to send verification email. Please try again.");
    }
  } else {
    alert("No user is signed in.");
  }
};
</script>

