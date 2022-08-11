import { useRef } from 'react';
import useScript from '../../hooks/useScript';

function GoogleLogin({
    onGoogleSignIn = () => {},
    text = 'signin_with',
}) {
    const googleSignInButton = useRef(null);

    useScript('https://accounts.google.com/gsi/client', () => {
        window.google.accounts.id.initialize({
            client_id: "",
            callback: onGoogleSignIn,
        });

        window.google.accounts.id.renderButton(
            googleSignInButton.current,
            { theme: 'filled_white', size: 'large', text, width: '250' },
        );
    });

    return <div ref={googleSignInButton}></div>
}

export default GoogleLogin;