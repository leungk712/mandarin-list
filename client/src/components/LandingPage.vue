<template>
    <div>
        <h1> Landing Page yo</h1>
        <!-- <v-carousel height="750">
            <v-carousel-item
                v-for="(image, idx) in chinaImages"
                :key="idx"
                :src="image.src"
            >
            </v-carousel-item>
        </v-carousel> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: "LandingPage"
})
export default class LandingPage extends Vue {
    // ===== Store ===== //

    // ===== Data ===== //
    public model = 0;
    public chinaImages = [
        {
            src: `../assets/joshua-sortino-gii7lF4y0WY-unsplash.jpg`
        },
        {
            src: `../assets/li-yang-5h_dMuX_7RE-unsplash.jpg`
        },
        {
            src: `../assets/ling-tang-yBroAF1cN3I-unsplash.jpg`
        },
        {
            src: `../assets/sam-beasley-eltps1t7gDY-unsplash.jpg`
        },
        {
            src: `../assets/theodor-lundqvist-WHhbYArwFt8-unsplash.jpg`
        }
    ];

    // ===== Methods ===== //

    // ===== Computed ===== //
}
</script>