import Vue from "vue";
import Validdator from "vee-validate";
import { Alerter } from "../utils/alerter";
import HelloComponent from "./components/helloworld";


//Alerter("You've reached the homepage");

let v = new Vue({
    el: "#app",
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
            this.$validator.errors.clear();
        }
    },
     components: {
        HelloComponent
    }
});