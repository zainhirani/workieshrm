// import { createContext, useCallback, useContext } from "react";
// import { useRouter } from "next/router";
// import { Box, CircularProgress } from "@mui/material";
// import { signOut as logout, signIn, useSession } from "next-auth/react";
// import { AUTH_LOGIN_URL } from "configs";
// import { getAuthenticationToken, setAuthenticationHeader } from "services";
// // import { FLEET_MANAGEMENT } from "constants/routes";
// // import OverlayLoader from "theme/Loader/OverlayLoader";

// interface AuthContextType {
//   currentUser: any;
//   signOut: () => void;
//   signIn: (...args: any) => void;
// }

// interface AuthContextProps {
//   children?: any;
// }

// const AuthContext = createContext({} as AuthContextType);

// const AUTHENTICATION_PATH = [AUTH_LOGIN_URL];

// const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
//   const { data: session, status } = useSession();
//   const loading = status === "loading";
//   const router = useRouter();
//   console.log(session,"session context")

//   const signOut = useCallback(async () => {
//     logout({ callbackUrl: "/" });
//     router.replace(AUTHENTICATION_PATH[0]!);
//   }, [router]);

//   const prevToken = getAuthenticationToken();
//   //@ts-ignore
//   const currToken: any = session?.accessToken;

//   if (currToken && prevToken !== `Bearer ${currToken}`) {
//     setAuthenticationHeader(currToken);
//   }

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
//   if (
//     !!process.browser &&
//     !(AUTHENTICATION_PATH || "").includes(window?.location?.pathname) &&
//     !session?.user &&
//     !loading
//   ) {
//     //@ts-ignore
//     router.replace(AUTHENTICATION_PATH[0]!);
//     return null;
//   }

//   if (
//     !!process.browser &&
//     (AUTHENTICATION_PATH || "").includes(window?.location?.pathname) &&
//     session &&
//     session.user &&
//     !loading
//   ) {
//     const params: { pathname: string; query?: { redirectTo: string } } = {
//       pathname:
//         // @ts-ignore
//         "/",
//     };
//     router.replace(params);
//     return null;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn,
//         signOut,
//         currentUser: session?.user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const AuthContextConsumer = AuthContext.Consumer;

// function useAuthContext(): AuthContextType {
//   return useContext(AuthContext);
// }

// export {
//   AuthContext,
//   AuthContextProvider,
//   AuthContextConsumer,
//   useAuthContext,
// };
// export default AuthContext;

//@ts-nocheck

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";
import { signOut as logout, signIn, useSession } from "next-auth/react";
import { AUTH_LOGIN_URL, AUTH_SIGNUP_URL, AUTH_VERIFY_URL, TOKEN } from "configs";
import { getAuthenticationToken, setAuthenticationHeader } from "services";
import { Register } from "providers/Auth/types";
// import { FLEET_MANAGEMENT } from "constants/routes";
// import OverlayLoader from "theme/Loader/OverlayLoader";

interface AuthContextType {
  currentUser: Register.Fields;
  signOut: () => void;
  signIn: (...args: any) => void;
}
interface AuthContextProps {
  children?: any;
}

const AuthContext = createContext({} as AuthContextType);

const AUTHENTICATION_PATH = [AUTH_LOGIN_URL, AUTH_SIGNUP_URL,AUTH_VERIFY_URL];

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const ref = useRef();
  console.log(session,"session")

  //   if (
  //     (session?.user || localStorage.getItem(TOKEN)) &&
  //     (router.pathname.includes("/login") || router.pathname.includes("/"))
  //   ) {
  //     router.replace("/");
  //     return null;
  //   }
  //   if (session?.user && router.pathname.includes("/register")) {
  //     router.replace("/register");
  //   }
  // }, []);

  const signOut = useCallback(async () => {
    logout({ callbackUrl: "/login" });
    router?.replace(AUTHENTICATION_PATH[0]!);
    localStorage.clear();
  }, [router]);

  const prevToken = getAuthenticationToken();
  //@ts-ignore
  const currToken: any = session?.accessToken;

  if (currToken && prevToken !== `Bearer ${currToken}`) {
    setAuthenticationHeader(currToken);
  }

  async function getTokenFunction() {
    if (typeof window !== "undefined") {
      if (router.pathname.includes("register")) {
        const getToken = localStorage.getItem(TOKEN);
        setAuthenticationHeader(getToken);
      }
    }
  }
  if (router.pathname.includes("register")) {
    setInterval(() => {
      getTokenFunction();
    }, 3000);
  }
  getTokenFunction();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // if (
  //   !!process.browser &&
  //   !(AUTHENTICATION_PATH || "").includes(window?.location?.pathname) &&
  //   !session?.accessToken &&
  //   !loading
  // ) {
  //   router.replace(AUTHENTICATION_PATH[0]!);
  //   return null;
  // }

  // if (
  //   !!process.browser &&
  //   (AUTHENTICATION_PATH || "").includes(window?.location?.pathname) &&
  //   session &&
  //   session.accessToken &&
  //   !loading
  // ) {
  //   const params: { pathname: string; query?: { redirectTo: string } } = {
  //     pathname: "/",
  //   };
  //   router.replace(params);
  //   return null;
  // }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        currentUser: session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthContextConsumer = AuthContext.Consumer;

function useAuthContext(): AuthContextType {
  return useContext(AuthContext);
}

export {
  AuthContext,
  AuthContextProvider,
  AuthContextConsumer,
  useAuthContext,
};
export default AuthContext;
