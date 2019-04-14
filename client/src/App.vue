<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline">
                <span class="font-weight-light">Latin Text-Morse Code Encoder-Decoder</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    flat
                    href="https://github.com/Murat0zer/kartaca-assignmentb"
                    target="_blank"
            >
                <span class="mr-2">Source Code</span>
            </v-btn>
        </v-toolbar>

        <v-content>
            <HelloWorld/>
            <Interface convertMode="latinToMorse"></Interface>
            <Interface convertMode="morseToLatin"></Interface>
        </v-content>
    </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld'
    import Interface from "./components/Interface";


    export default {
        name: 'App',
        components: {
            Interface,
            HelloWorld
        }
    }



    </script>
