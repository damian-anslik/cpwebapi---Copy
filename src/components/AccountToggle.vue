<script>
import { useAccountTypeStore } from '@/stores/accountTypeStore.js';
export default {
    setup() {
        return {
            store: useAccountTypeStore()
        }
    },
    methods: {
        onAccountToggled(event) {
            let clickedElementID = event.target.id;
            if (!clickedElementID) {
                return;
            }
            this.store.setAccountType(clickedElementID);
        }
    }
}
</script>

<template>
    <div class="toggle-switch" @click="onAccountToggled">
        <button id="individual" :class="(store.accountType == 'individual') ? 'active' : ''">Individual</button>
        <button id="institutional"
            :class="(store.accountType == 'institutional') ? 'active' : ''">Institutional</button>
    </div>
</template>

<style scoped>
.toggle-switch {
    display: flex;
    flex-direction: row;
    margin: 0;
    background-color: #f5f5f5;
    border-radius: 40px;
    color: white;
    border: 0.5px solid #959595;
}

.toggle-switch button {
    background-color: #f5f5f5;
    border-radius: 40px;
    border: none;
    cursor: pointer;
    color: #959595;
    font-size: small;
    padding-inline: 0.75rem;
    padding-block: 0.5rem;
}

.toggle-switch button.active {
    background-color: #344D78;
    color: white;
}

@media only screen and (min-width: 700px) {
    .toggle-switch {
        border: none;
    }
}
</style>