'use client';

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const isOpen = useAuthModal((state) => state.isOpen);
    const onClose = useAuthModal((state) => state.onClose);

    useEffect(() => {
        if (session) {
          router.refresh();
          onClose();
        }
      }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        console.log(open);
        if (!open) {
          onClose();
        }
      }
    return (
        <Modal title="Welcome back" description="Login to your account" isOpen={isOpen} onChange={onChange}>
            <Auth
                theme="dark"
                magicLink
                providers={["google"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e'
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
}


export default AuthModal;
