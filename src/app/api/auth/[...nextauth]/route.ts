import NextAuth, { CallbacksOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";

const authOptions = {
    callbacks: {
        async signIn({profile}: {profile: {login: string}}){
            return profile.login === "wilfred-unsho";
        },
    } as unknown as CallbacksOptions,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};