import Vue from "vue";
import VeeValidate from 'vee-validate';
import { Alerter } from "../utils/alerter";

Vue.use(VeeValidate);
//Alerter("You've reached the homepage");

let v = new Vue({
    el: "#contact",
    //template: `
    //<div>
    //    <div>Hello {{name}}!</div>
    //    Name: <input v-model="name" type="text">

    //</div>`,
    data: {
        name: 'Asad',
        email: 'a.samarian@gmail.com',
        message: '',
        errorMessage: 'Error!'
    },

    methods: {
        send: function () {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.reset();
                    alert('Form submitted!');
                } else {
                    this.errorMessage = 'Please fix all validation errors.'
                }
            });
        },
        reset: function () {
            this.name = '';
            this.email = '';
            this.message = '';
            this.errorMessage = '';
            this.$validator.clear();
        }
    }
});