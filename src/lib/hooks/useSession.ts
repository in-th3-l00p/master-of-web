import {useEffect, useState} from "react";
import {supabase} from "../supabase.ts";
import type {Session} from "@supabase/auth-js";
import {AuthError} from "@supabase/auth-js";

export interface Profile {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    country: string;
}

export default function useSession() {
    const [user, setUser] = useState<Profile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | AuthError | null>(null);

    useEffect(() => {
        supabase.auth.getSession()
            .then(async (session) => {
                if (session.error) {
                    setError(session.error);
                    setLoading(false);
                    return;
                }
                setSession(session.data.session);
                const publicUser = await supabase
                    .from("users")
                    .select("id, username, first_name, last_name, country")
                    .eq("id", session.data.session?.user.id);
                if (publicUser.error) {
                    setError(publicUser.error);
                    setLoading(false);
                    return;
                }
                setUser(publicUser.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return {user, session, loading, error};
}