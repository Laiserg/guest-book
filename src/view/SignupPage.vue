<template>
    <div id="signup">
        <h1 class="title">Регистрация</h1>
        <SignupForm />
    </div>
</template>

<script>
import firebase from 'firebase';
import SignupForm from '@/components/SignupForm.vue';

export default {
    name: 'signup',
    components: {
        SignupForm,
    },

    data() {
        return {

        };
    },
}
</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';

#signup {
    margin: 100px auto;
    box-shadow: 0 0 10px 2px $colorForBlueShadows;
    border-radius: 4px;
    padding: 50px 60px 90px;
    max-width: 440px;
}

</style>