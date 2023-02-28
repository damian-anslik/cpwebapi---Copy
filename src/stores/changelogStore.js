import { defineStore } from 'pinia';
import { changelog } from '@/docs/changelog';

export const useChangelogStore = defineStore('changelog', {
    state() {
        return {
            changes: changelog,
            activeFilters: []
        }
    },
    getters: {
        filteredChangelog(state) {
            return state.changes.filter(change => {
                return state.activeFilters.every(filter => change.tags.includes(filter));
              });
        },
        changelogTags(state) {
            return state.changes.reduce((tags, change) => {
                change.tags.forEach(tag => {
                  tags.includes(tag) ? null : tags.push(tag)
                });
                return tags;
              }, []);
        },
        recentChanges(state) {
            return (numChanges) => {
                return state.changes.sort((a, b) => {
                    return Date.parse(b.date) - Date.parse(a.date);
                }).slice(0, numChanges);
            }
        }
    },
    actions: {
        toggleFilter(filter) {
            // If the list of active filters already contains the filter, remove it, otherwise add it
            if (this.activeFilters.includes(filter)) {
                this.activeFilters = this.activeFilters.filter(activeFilter => activeFilter != filter);
            }
            else {
                this.activeFilters.push(filter);
            }
        },
        clearFilters() {
            this.activeFilters = [];
        }
    }
});