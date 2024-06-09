/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_ID,
        NEXT_PUBLIC_BASE_URL:process.env.NEXT_PUBLIC_BASE_URL
    }
};

export default nextConfig;
