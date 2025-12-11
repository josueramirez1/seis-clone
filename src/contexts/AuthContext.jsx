import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //Basic navigation to be passed
  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Caseload", href: "/caseload", current: false },
    { name: "Reference Library", href: "#", current: false },
  ];
  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "/" },
  ];

  //use states
  const [teacherId, setTeacherId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [session, setSession] = useState(null);
  const [user, setUser] = useState("");
  const [caseload, setCaseload] = useState([]);
  const [myStudent, setMyStudent] = useState([]);

  //Signup
  // const signUpNewUser = async (email, password) => {
  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });
  //     if (error) {
  //       throw new Error(error.message);
  //     }
  //     console.log("sign up success", data);
  //     return { success: true, data };
  //   } catch (error) {
  //     console.error("Something went wrong when signing up", error);
  //     return { success: false, error: error.message };
  //   }
  // };

  useEffect(() => {
    //hydrates state from Supabase
    const startSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    startSession();

    //subscribe to login/logout changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
        setUser(session?.user ?? null);
        setTeacherId(session?.user?.id);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  //Sign in
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("sign in error", error);
        throw new Error(error.message);
      }

      setErrorMsg(null);
      setErrMsg("");

      return { success: true, data };
    } catch (error) {
      setErrorMsg(`Invalid Credentials`);
      setErrMsg(`Please contact administrator to help with sign in.`);
      console.error("Something went wrong when signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  //Sign out
  const signOutUser = async (e) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(`There was an error:`, error);
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      console.log("Something went wrong when signing out", error);
      return { success: false, error: error.message };
    }
  };

  //Fetch caseload
  const fetchCaseload = async () => {
    try {
      const { data, error } = await supabase
        .from("swd")
        .select("*")
        .eq("teacher_id", teacherId);

      if (error) {
        throw new Error(error.message);
      }
      const students = data;

      const teacherData = {
        email: students[0]?.teacher_email,
        name: students[0]?.case_manager,
        picture: students[0]?.imageUrl,
      };

      setUser(teacherData);
      setCaseload(students);

      return { sucess: true, data: students };
    } catch (error) {
      console.error("There was a problem fetching caseload", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  //Fetch student
  const fetchStudent = async (id) => {
    try {
      const { data, error } = await supabase
        .from("swd")
        .select("*")
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      const student = data[0];

      setMyStudent(student);

      return { success: true, data: student };
    } catch (error) {
      console.error("There was a problem fetching student", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setSession,
        loading,
        errMsg,
        errorMsg,
        user,
        setUser,
        navigation,
        userNavigation,
        caseload,
        session,
        myStudent,
        setCaseload,
        signInUser,
        signOutUser,
        fetchCaseload,
        fetchStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
