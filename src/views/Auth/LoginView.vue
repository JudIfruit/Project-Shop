<script setup>

import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { authenticate } = authStore;
const { errors } = storeToRefs(useAuthStore());

const formDataLogin = reactive({
  email: "",
  password: "",
});

const formDataRegister = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const handleLogin = async () => {
  console.log("Tentative de connexion avec :", formDataLogin);
  await authenticate("login", formDataLogin);
  console.log("Erreurs après tentative :", errors.value);
};

const handleRegister = async () => {
  console.log("Tentative d'inscription avec :", formDataRegister);
  await authenticate("register", formDataRegister);
  console.log("Erreurs après tentative :", errors.value);
};

onMounted(() => {
    errors.value = {};
    const loginBtn = document.querySelector("#login");
    const registerBtn = document.querySelector("#register");
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");

    if (loginBtn && registerBtn && loginForm && registerForm) {
        loginBtn.addEventListener("click", () => {
            loginBtn.style.backgroundColor = "#21264D";
            loginBtn.style.border = "none";
            registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            registerBtn.style.border = "3px solid rgba(255, 255, 250, 0.3)";

            loginForm.style.left = "50%";
            registerForm.style.left = "-50%";

            loginForm.style.opacity = "1";
            registerForm.style.opacity = "0";

            document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
        });

        registerBtn.addEventListener("click", () => {
            registerBtn.style.backgroundColor = "#21264D";
            registerBtn.style.border = "none";
            loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            loginBtn.style.border = "3px solid rgba(255, 255, 250, 0.3)";

            loginForm.style.left = "-50%";
            registerForm.style.left = "50%";

            loginForm.style.opacity = "0";
            registerForm.style.opacity = "1";

            document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
        });
    }
});


</script>


<template>
        
<body class="flex flex-col">

    <RouterLink :to="{ name: 'home' }" class="retour-accueil">Retour à l'accueil</RouterLink>

    
    <div class="form-container">
        <div class="col col-1">
            <div class="image-layer">
                <img src="../../assets/img/login.png" class="form-image-main" alt="">
            </div>
            <p class="featured-words">Votre sécurité est notre <span>métier</span></p>
        </div>
        <div class="col col-2">
            <div class="btn-box">
                <button class="btn btn-1" id="login">Sign In</button>
                <button class="btn btn-2" id="register">Sign Up</button>
            </div>

    <!-- Login Form -->
            <div class="login-form">
                <div class="form-title">
                    <span>Sign In</span>
                </div>
                <form class="form-inputs" @submit.prevent="handleLogin">
                    <div class="input-box">
                        <input v-model="formDataLogin.email" type="text" class="input-field" placeholder="Email" required>
                        <box-icon name='envelope' class="icon" color="#fff"></box-icon>
                    </div>
                    <p v-if="errors.email" class="text-red-500 m-0">
                        {{ errors.email?.[0] }}
                    </p>
                    <div class="input-box">
                        <input v-model="formDataLogin.password" type="password" class="input-field" placeholder="Password" required>
                        <box-icon name='lock' class="icon" color="#fff"></box-icon>  
                    </div>
                    <p v-if="errors.password" class="text-red-500 m-0">
                        {{ errors.password?.[0] }}
                    </p>                    
                    <div class="input-box">
                        <button type="submit" class="input-submit">
                            <span>Sign In</span>
                            <box-icon name='right-arrow-alt' color="#fff" size="18px"></box-icon>
                        </button>
                    </div>
                </form>

                <div class="social-login">
                    <box-icon type='logo' name='google' class="icon" color="#fff" size="20px"></box-icon>
                    <box-icon type='logo' name='facebook' class="icon" color="#fff" size="20px"></box-icon>
                    <box-icon type='logo' name='twitter' class="icon" color="#fff" size="20px"></box-icon>
                    <box-icon type='logo' name='instagram' class="icon" color="#fff" size="20px"></box-icon>
                    <box-icon type='logo' name='github' class="icon" color="#fff" size="20px"></box-icon>
                </div>
            </div>

    <!-- Register Form -->
            <div class="register-form">
                <div class="form-title">
                    <span>Create Account</span>
                </div>
                <form class="form-inputs" @submit.prevent="handleRegister">
                    <div class="input-box">
                        <input v-model="formDataRegister.email" type="text" class="input-field" placeholder="Email" required>
                        <box-icon name='envelope' class="icon" color="#fff"></box-icon>
                    </div>
                    <p v-if="errors.email" class="text-red-500 m-0">
                            {{ errors.email?.[0] }}
                    </p>
                    <div class="input-box">
                        <input v-model="formDataRegister.name" type="text" class="input-field" placeholder="Username" required>
                        <box-icon name='user' class="icon" color="#fff"></box-icon>
                    </div>
                    <div class="input-box">
                        <input v-model="formDataRegister.password" type="password" class="input-field" placeholder="Password" required>
                        <box-icon name='lock' class="icon" color="#fff"></box-icon>
                    </div>
                    <p v-if="errors.password" class="text-red-500 m-0">
                        {{ errors.password[0] }}
                    </p>
                    <div class="input-box">
                        <input v-model="formDataRegister.password_confirmation" type="password" class="input-field" placeholder="Password Confirmation" required>
                        <box-icon name='lock' class="icon" color="#fff"></box-icon>
                    </div>
                    <p v-if="errors.password_confirmation" class="text-red-500 m-0">
                        {{ errors.password_confirmation[0] }}
                    </p>
                    <div class="forgot-pass">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div class="input-box mb-16">
                        <button class="input-submit">
                            <span>Create Account</span>
                            <box-icon name='right-arrow-alt' color="#fff" size="18px"></box-icon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

<RouterView />

</template>

<style scoped>

.retour-accueil {
    position: absolute;
    top: 20px;
    left: 20px;
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    background: #21264D;
    padding: 8px 12px;
    border-radius: 8px;
    transition: 0.3s;
}

.retour-accueil:hover {
    background: rgba(255, 255, 255, 0.4);
}


body{
    background-color: #302082;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;

    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 20px;
}

.form-container{
    display: flex;
    width: 1000px;
    min-height: 600px;
    border: 3px solid rgba(255, 255, 250, 0.3);
    border-radius: 30px;
    backdrop-filter: blur(20px);
    overflow: hidden;
    flex-wrap: wrap;
}

.col-1{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 55%;
    background: rgba(255, 255, 255, 0.304);
    backdrop-filter: blur(30px);
    border-radius: 0 30% 20% 0;
    transition: border-radius .3s;
}

.col-1, .col-2 {
    flex: 1;
    min-height: 100%;
}

.image-layer{
    position: relative;
}

.form-image-main{
    width: 400px;
}

.form-image{
    position: absolute;
    left: 0;
    width: 400px;
}

.featured-words{
    text-align: center;
    color: #fff;
    width: 300px;
}

.featured-words span{
    color: #FF6B00;
}

.col-2 {
    position: relative;
    width: 45%;
    padding: 20px;
    overflow-y: auto; 
    max-height: 100%;
}

.col-2::-webkit-scrollbar {
    display: none;
}


.btn-box{
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.btn{
    font-weight: 500;
    padding: 5px 30px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    cursor: pointer;
    transition: .2s;
}

.btn-1{
    background: #21264D;
}

.btn-2{
    background: rgba(255, 255, 255, 0.2);
    border: 3px solid rgba(255, 255, 250, 0.3);
}

.btn:hover{
    opacity: 0.85;
}

.login-form{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 4vw;
    transition: .3s;
}

.register-form{
    position: absolute;
    left: -50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 4vw;
    transition: .3s;
}

.register-form .form-title{
    margin-block: 40px 20px;
}

.form-title{
    margin: 40px 0;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
}

.form-inputs{
    width: 100%;
}

.input-box{
    position: relative;
}

.input-field{
    width: 100%;
    height: 55px;
    padding: 0 15px;
    margin: 10px 0;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 10px;
    outline: none;
    backdrop-filter: blur(20px);
    border: 3px solid rgba(255, 255, 250, 0.3);
}
::placeholder{
    color: #fff;
    font-size: 15px;
}

.input-box .icon{
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
}

.forgot-pass{
    display: flex;
    justify-content: right;
    gap: 5px;
}

.forgot-pass a{
    color: #fff;
    text-decoration: none;
    font-size: 14px;
}

.forgot-pass a:hover{
    text-decoration: underline;
}

.input-submit{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 55px;
    padding: 0 15px;
    margin: 10px 0;
    color: #fff;
    background: #21264D;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: .3s;
}

.input-submit:hover{
    gap: 15px;
}

.social-login{
    display: flex;
    gap: 20px;
    margin-top: 20px;
    
}

.social-login .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
}

.social-login .icon:hover{
    transform: scale(0.9);
}

/* ======== Responsive ======= */

@media (max-width: 892px){
    .form-container{
        width: 400px;
    }
    .col-1{
        display: none;
    }
    .col-2{
        width: 100%;
    }
}

</style>