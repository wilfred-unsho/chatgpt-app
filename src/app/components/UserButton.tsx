"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";

function getFirstTwoCapitalLetters(str?: string | null){
    const match = (str || "").match(/[A-Z]/g);
    return match ? match.slice(0, 2).join("") : "GT";
}

export default function UserButton(){
    const {data: session, status} = useSession();

    return (
        <div>
            {status === "authenticated" && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={session?.user?.image!} />
                            <AvatarFallback>
                                {getFirstTwoCapitalLetters(session?.user?.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                        onClick={() => {
                            signOut()
                        }}
                        >
                            SignOut
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {status === "unauthenticated" && (
                <Button onClick={() => signIn()}> Sign In</Button>
            )}
        </div>
    );
}