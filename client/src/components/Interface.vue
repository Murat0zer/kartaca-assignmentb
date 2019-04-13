<template>
        <v-container>
            <v-layout row wrap>
                <v-flex offset-xs1 xs5>

                    <v-textarea
                            :placeholder='this.convertMode==="latinToMorse" ? "Latin Text" : "Morse Code"'
                            v-model="value"
                            v-on:change="convertData(value)"
                            solo
                    >

                    </v-textarea>

                </v-flex>

                <v-flex offset-xs1 xs5>
                    <v-textarea
                            v-bind:key="componentKey"
                            :value="convertedValue"
                            :placeholder='this.convertMode==="latinToMorse" ? "Morse Code" : "Latin Text"'
                            solo
                    >
                    </v-textarea>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>

    import Socket from 'socket.io-client'

    import Vuex from 'vuex'
    import Vue from 'vue'

    Vue.use(Vuex);

    const store = new Vuex.Store({
        state: {
            converted: ''
        },
        mutations: {
            setConvertedValue (state, value) {
                state.converted = value;
            }
        }
    });


    let socket = Socket.connect("http://localhost:3000", {'sync disconnect on unload': true});

    export default {
        name: "Interface",
        props: {convertMode: String},
        data() {
            return {
                value: '',
                convertedData: '',
                componentKey: 0,
            }

        },
        computed: {
            convertedValue () {
               return  store.state.converted;
            }

        },
        methods: {
            convertData: function (data) {
                socket.emit('message', {'convertMode': this.convertMode, 'data': data});

            }

        },
    }

    socket.on('message', function (message) {
        store.commit('setConvertedValue', message.convertedData)
    })



</script>

<style scoped>

</style>
