import { defineStore } from 'pinia';

export const useAccountTypeStore = defineStore('accountType', {
    state: () => ({ accountType: localStorage.getItem('accountType') || 'individual' }),
    actions: {
        setAccountType(type) {
            this.accountType = type;
            localStorage.setItem('accountType', type);
        }
    }
});