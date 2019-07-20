<template>
    <div id="signup-form">
        <form action="" class="form">
            <label class="input-label" for="username-login-input">
                <input v-model="username" id="username-login-input" class="input" type="text" required>
                <span class="input-placeholder">Имя пользователя</span>
            </label>
            <label class="input-label" for="email-login-input">
                <input v-model="email" id="email-login-input" class="input" type="text" required>
                <span class="input-placeholder">E-mail</span>
            </label>
            <label class="input-label" for="password-login-input">
                <input v-model="password" id="password-login-input" class="input" type="password" required>
                <span class="input-placeholder">Пароль</span>
            </label>
            <button v-on:click="register" class="submit-btn btn" type="submit">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import db from '@/firebase-init.js';
import firebase from 'firebase';

export default {
    name: 'signupForm',

    data() {
        return {
            username: '',
            email: '',
            password: '',
        };
    },

    methods: {
        register(e) {
            if (this.isUsernameFree(this.username)) {
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(
                    user => {
                        // добавляем имя пользователя в отдельную БД, идентификторы документов в ней - имена пользователей в нижнем регистре
                        // по этой базе мы проверяем свободно имя или нет
                        db.collection('usernames').doc(this.username.toLowerCase()).set({
                            username: this.username,
                            userId: user.user.uid
                        });
                        // затем добавляем имя в базу юзеров, идентификторы документов в ней - ID пользователя
                        // эта база нужна, чтобы в дальнейшем быстро вытаскивать имя пользователя (без перебора всей базы)
                        db.collection('users').doc(user.user.uid).set({
                            username: this.username
                        });
                        alert(`Account created for ${user.user.email}`);
                        this.$router.push('/guest-book');
                    },
                    err => {
                        alert(err.message);
                    }
                );
                e.preventDefault();
            } else {
                alert(`Username "${this.username}" is already used`);
                e.preventDefault();
            }
            
        },

        // функция для проверки имени пользователя (свободен или нет)
        isUsernameFree(username) {
            return db.collection('usernames').doc(username.toLowerCase()).exists ? false : true;
        }
    },
}
</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';


    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .input-label {
            position: relative;
            width: 100%;

            .input-placeholder {
                position: absolute;
                top: 36px;
                left: 4px;
                font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                transition: all ease-in-out .2s;
                font-size: 14px;
                color: $colorForPlaceholders;
                cursor: text;
            }

            .input {
                width: 100%;
                margin: 14px 0;
                border: none;
                border-bottom: 2px solid #ddd;
                padding: 22px 4px 8px;
                font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                transition: all ease-in-out .2s;
                color: $colorForTitles;

                &:focus {
                    outline: none;
                    border-bottom: 2px solid $colorForBlueBorders;

                    +.input-placeholder {
                        font-size: 12px;
                        color: $blue;
                        transform: translateY(-26px);
                    }
                }
                
                &:valid {

                    +.input-placeholder {
                        font-size: 12px;
                        color: $blue;
                        transform: translateY(-26px);
                    }
                    
                }
            }
        }

        .service-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 14px;
            font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 13px;

            .remember-me-label {
                display: flex;
                align-items: center;
                cursor: pointer;

                .remember-me-label-text {
                    margin-left: 10px;
                    color: $colorForPlaceholders;
                    transition: all ease-in-out .2s;

                    &:hover {
                        color: $blue;
                    }
                }
            }

            .forgot-pass-link {
                color: $blue;
                text-decoration: none;
                border-bottom: 1px solid transparent;
                padding-bottom: 2px;
                transition: all ease-in-out .2s;

                &:hover {
                    border-bottom: 1px solid;
                }
            }
        }
        

        .submit-btn {
            padding: 10px 0;
            border: none;
            background: linear-gradient(to right, $lightBlue, $darkBlue);
            color: white;
            font-weight: bold;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            letter-spacing: .3px;
            font-size: 14px;
            margin-top: 70px;
            width: 100%;
            box-shadow: 0 3px 10px 2px $colorForBlueShadows;
            transition: all ease-in-out .2s;

            &:hover {
                transform: translateY(-2px);
            }
        }

    }

</style>