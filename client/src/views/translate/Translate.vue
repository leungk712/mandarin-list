<template>
    <div>
        <v-container fluid style="width: 80%">
            <v-row class="mt-6">
                <h4>Inspired by Google Translate, type in your simplified chinese characters and we'll produce a pinyin version</h4>
            </v-row>
            <v-row style="border: 1px solid black; width: 100%" justify="space-around" align="center" class="mt-6">
                <v-col cols="6">
                    Simplified Chinese Characters
                </v-col>
                <v-col>
                    Pinyin
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    // import convert = require('hanzi-to-pinyin');

    @Component({
        name: "Translate"
    })
    export default class Translate extends Vue {
        // ===== Computed ===== //
        // get convert() {
        //     return convert;
        // }
    }
</script>