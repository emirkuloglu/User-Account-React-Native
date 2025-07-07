import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';


export const login = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;

    await AsyncStorage.setItem("userToken", token)

    return { user, token };
  } catch (error) {
    console.log('userSlice login error:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});



//KULLANICI OTOMATIK GIRIS ISLEMLERI
export const autoLogin = createAsyncThunk('user/autoLogin', async()=>{
  try {
    const token = await AsyncStorage.getItem("userToken")

    if (token) {
      return token
    }else{
      throw new Error("User not found")
    }

  } catch (error) {
    throw error
  }
})



//KULLANICI CIKIS ISLEMLERI
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem("userToken");
    return null;
  } catch (error) {
    console.log("Logout thunk error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});




//KULLANICI KAYIT ISLEMLERI
export const register = createAsyncThunk('user/register', async({ email, password, username }, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;

    await sendEmailVerification(user); // Email onayı isteğe bağlı

    await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        createdAt: new Date()
      })

    await AsyncStorage.setItem("userToken", token);

    return token;
  } catch (error) {
    console.log("Register error:", error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});



const initialState = {
  username: null,
  email: null,
  password: null,
  isLoading: false,
  token: null,
  user: null,
  error: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.toLowerCase();
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
      })


      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
      })


      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error=null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })



      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = "Invalid email or password";
      });
  },
});

export const { setEmail, setPassword, setIsLoading } = userSlice.actions;
export default userSlice.reducer;