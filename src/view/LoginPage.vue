<template>
    <div id="login">

        <div class="form-wrapper">

            <h2 class="title">Вход</h2>

            <form action="" class="form">

                <label class="input-label" for="email-login-input">
                    <input v-model="email" id="email-login-input" class="input" type="text" required>
                    <span class="input-placeholder">E-mail</span>
                </label>

                <label class="input-label" for="password-login-input">
                    <input v-model="password" id="password-login-input" class="input" type="password" required>
                    <span class="input-placeholder">Пароль</span>
                </label>

                <div class="service-container">
                    <label class="remember-me-label" for="remember-me">
                        <input type="checkbox" name="rememberMeCheckbox" id="remember-me">
                        <span class="remember-me-label-text">Запомнить меня</span>
                    </label>

                    <a href="#" class="forgot-pass-link">Забыли пароль?</a>
                </div>

                <button v-on:click="login" class="submit-btn btn" type="submit">Войти</button>

            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login(e) {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(
                user => {
                    alert(`Youre logged in as ${user.user.email}`);
                    this.$router.push('/guest-book');
                },
                err => {
                    alert(err.message);
                }
            );
            e.preventDefault();
        }
    },
}

</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';

#login {
    margin: 100px auto;
}

.form-wrapper {
    box-shadow: 0 0 10px 2px $colorForBlueShadows;
    border-radius: 4px;
    padding: 50px 60px 90px;
    width: 440px;
    margin: 0 auto;

    .title {
        text-align: center;
        font-family: 'Ubuntu', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0 0 30px 0;
        color: $colorForTitles;
    }

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

}

</style>