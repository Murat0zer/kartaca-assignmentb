<template>
        <v-container>
            <v-layout row wrap align-center justify-space-between fill-height>
                <v-flex  xs5 >
                    <h2 v-if="this.convertMode===convertModes.LATIN_TO_MORSE">Write latin text to encode!</h2>
                    <h2 v-else>Write morse code to decode!</h2>
                    <v-textarea
                            :placeholder='this.convertMode===convertModes.LATIN_TO_MORSE ? "Latin Text" : "Morse Code"'
                            v-model="value"
                            v-on:input="convertValue(value)"
                            solo
                    >

                    </v-textarea>

                </v-flex>

                <v-flex  xs5 >
                    <h2 v-if="this.convertMode===convertModes.LATIN_TO_MORSE">Morse code equivalent of latin text!</h2>
                    <h2 v-else>Latin text equivalent of morse code</h2>
                    <v-textarea
                            :value= 'this.convertMode===convertModes.LATIN_TO_MORSE ? morseCode : latinValue'
                            :placeholder='this.convertMode===convertModes.LATIN_TO_MORSE ? "Morse Code" : "Latin Text"'
                            solo
                            readonly
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
            latinValue: '',
            morseCode : '',
            that: this

        },
        mutations: {
            setLatinValue (state, convertedValue) {
                state.latinValue = convertedValue;
            },
            setMorseCode (state, convertedValue) {
                state.morseCode = convertedValue;
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
                convertedValue: '',
                convertModes : {
                    LATIN_TO_MORSE : 'latinToMorse',
                    MORSE_TO_LATIN : 'morseToLatin',
                }
            }
        },

        computed: {
            morseCode () {
                return  store.state.morseCode;
            },
            latinValue  () {
                return store.state.latinValue
            }
        },

        methods: {
            convertValue: function (value) {

                const that = this;

                socket.emit('message', {'convertMode': this.convertMode, 'value': value});

                socket.on('message', function (message) {
                    switch (message.convertMode) {

                        case that.convertModes.LATIN_TO_MORSE :
                            store.commit('setMorseCode', message.convertedValue);
                            break;

                        case that.convertModes.MORSE_TO_LATIN :
                            store.commit('setLatinValue', message.convertedValue);
                            break;
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>
