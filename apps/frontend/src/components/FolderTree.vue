<script setup lang="ts">
import { ref } from 'vue';
import type { FolderNode } from '../api/types';


const props = defineProps<{
    nodes: FolderNode[];
    selectedId: number | null;
}>();

const emit = defineEmits<{
    (e: 'select', folder: FolderNode | null): void;
}>();

const openSet = ref<Set<number>>(new Set());

const toggleOpen = (id: number) => {
    if (openSet.value.has(id)) {
        openSet.value.delete(id);
    } else {
        openSet.value.add(id);
    }
};

const isOpen = (id: number) => openSet.value.has(id);

const onSelect = (folder: FolderNode) => {
    emit('select', folder);
};
</script>

<template>
    <ul class="folder-tree">
        <li v-for="node in nodes" :key="node.id">
            <div class="folder-item" :class="{ selected: node.id === selectedId }">
                <button class="toggle" @click="toggleOpen(node.id)">
                    <span v-if="node.children.length">
                        {{ isOpen(node.id) ? '▼' : '▶' }}
                    </span>
                    <span v-else>•</span>
                </button>
                <span class="folder-name" @click="onSelect(node)">
                    📁 {{ node.name }}
                </span>
            </div>

            <FolderTree v-if="node.children.length && isOpen(node.id)" :nodes="node.children" :selected-id="selectedId"
                @select="$emit('select', $event)" />
        </li>
    </ul>
</template>

<style scoped>
.folder-tree {
    list-style: none;
    padding-left: 0.5rem;
}

.folder-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    padding: 2px 4px;
}

.folder-item.selected {
    background: #e5f1ff;
    border-radius: 4px;
}

.toggle {
    border: none;
    background: none;
    font-size: 0.75rem;
    cursor: pointer;
}
</style>
