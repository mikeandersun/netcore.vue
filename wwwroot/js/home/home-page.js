import Vue from "vue";
import HelloComponent from "./components/helloworld";
//Alerter("You've reached the homepage");
var v = new Vue({
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
            var _this = this;
            this.$validator.validateAll().then(function (result) {
                if (result) {
                    _this.reset();
                    alert('Form submitted!');
                }
                else {
                    _this.errorMessage = 'Please fix all validation errors.';
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
        HelloComponent: HelloComponent
    }
});
//# sourceMappingURL=home-page.js.map