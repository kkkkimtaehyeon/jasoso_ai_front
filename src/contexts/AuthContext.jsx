import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../common/api-axios.js";
import {useGoogleLogin} from "@react-oauth/google";

const AuthContext = createContext(null);

export const AuthProvider = ({children, setIsLoggedIn}) => {
    const [user, setUser] = useState(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // 로그인 함수
    const login = async (email, password) => {
        try {
            const response = await api.post("/api/users/login", {
                email,
                password
            });
            const loggedUser = response.data;
            setUser(loggedUser);
            setIsLoggedIn(true);
            return true;
        } catch (error) {
            // console.error('Login failed:', error);
            return false; // Return false on failure.
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // 토큰을 FastAPI 백엔드로 전송
            const res = await api.post( '/api/auth/google/login', {token: tokenResponse.access_token});
            const loggedUser = await res.data;
            setUser(loggedUser);
            setIsLoggedIn(true);
            // 로그인 성공 후 유저 정보 저장 등 후속 처리
            navigate('/')
        },
        onError: () => {
            console.log('Login Failed')
        },
    });

    // 로그아웃 함수
    const logout = () => {
        api.post('/api/users/logout')
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                console.error("Logout failed:", error);
                // 에러 메시지 처리 등
            })
            .finally(() => {
                setUser(null);
                setIsLoggedIn(false);
            })

    };

    const authContextValue = {
        user,
        // isLoggedIn,
        login,
        googleLogin,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 다른 컴포넌트에서 쉽게 사용할 수 있도록 커스텀 훅 생성
export const useAuth = () => useContext(AuthContext);